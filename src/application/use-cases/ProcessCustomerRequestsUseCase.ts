import { workflowConfig } from "../../config/WorkflowConfig.js";
import type {
  NormalizedCustomerRequest,
  ProcessedCustomerRequest,
  ProcessingSummary,
  RawCustomerRequest,
  ReasonCount,
} from "../../domain/entities/CustomerRequest.js";
import { BusinessRulesService } from "../../domain/services/BusinessRulesService.js";
import { DuplicateDetector } from "../../domain/services/DuplicateDetector.js";
import { NormalizationService } from "../../domain/services/NormalizationService.js";
import { ValidationService } from "../../domain/services/ValidationService.js";
import type { ProcessCustomerRequestsResult } from "../dtos/ProcessCustomerRequestsResult.js";

interface CustomerRequestRepository {
  readInput(filePath: string): Promise<RawCustomerRequest[]>;
  writeOutput(
    filePath: string,
    records: ProcessedCustomerRequest[],
  ): Promise<void>;
}

interface EnrichmentProvider {
  enrich(request: NormalizedCustomerRequest): NormalizedCustomerRequest & {
    region: string;
    customerSegment: string;
    priorityScore: number;
  };
}

interface ReportWriter {
  write(
    filePath: string,
    summary: ProcessingSummary,
    outputFiles: {
      approved: string;
      manualReview: string;
      rejected: string;
      duplicates: string;
    },
  ): Promise<void>;
}

interface NotificationWriter {
  write(
    filePath: string,
    summary: ProcessingSummary,
    reportPath: string,
  ): Promise<void>;
}

interface AutomationLogger {
  reset(): Promise<void>;
  info(message: string): Promise<void>;
}

export class ProcessCustomerRequestsUseCase {
  public constructor(
    private readonly csvRepository: CustomerRequestRepository,
    private readonly normalizationService: NormalizationService,
    private readonly validationService: ValidationService,
    private readonly businessRulesService: BusinessRulesService,
    private readonly enrichmentProvider: EnrichmentProvider,
    private readonly reportWriter: ReportWriter,
    private readonly notificationWriter: NotificationWriter,
    private readonly fileLogger: AutomationLogger,
  ) {}

  public async execute(): Promise<ProcessCustomerRequestsResult> {
    const startTime = Date.now();
    await this.fileLogger.reset();
    await this.fileLogger.info("Workflow started");
    await this.fileLogger.info(`Processing file: ${workflowConfig.inputFile}`);

    const rawRequests = await this.csvRepository.readInput(workflowConfig.inputFile);
    await this.fileLogger.info(`Total loaded: ${String(rawRequests.length)}`);

    const duplicateDetector = new DuplicateDetector();
    const approved: ProcessedCustomerRequest[] = [];
    const manualReview: ProcessedCustomerRequest[] = [];
    const rejected: ProcessedCustomerRequest[] = [];
    const duplicates: ProcessedCustomerRequest[] = [];
    let enriched = 0;

    for (const rawRequest of rawRequests) {
      const normalized = this.normalizationService.normalize(rawRequest);
      const validationReasons = this.validationService.validate(normalized);

      if (validationReasons.length > 0) {
        rejected.push(this.toRejectedRecord(normalized, validationReasons));
        continue;
      }

      if (duplicateDetector.isDuplicate(normalized)) {
        duplicates.push(this.toDuplicateRecord(normalized));
        continue;
      }

      const enrichedRequest = this.enrichmentProvider.enrich(normalized);
      enriched += 1;

      const classified = this.businessRulesService.classify(enrichedRequest);

      if (classified.status === "approved") {
        approved.push(classified);
      } else {
        manualReview.push(classified);
      }
    }

    const summary: ProcessingSummary = {
      inputRecords: rawRequests.length,
      approved: approved.length,
      manualReview: manualReview.length,
      rejected: rejected.length,
      duplicates: duplicates.length,
      enriched,
      processingTimeMs: Date.now() - startTime,
      rejectionReasons: this.countReasons(rejected),
      manualReviewReasons: this.countReasons(manualReview),
    };

    await this.csvRepository.writeOutput(
      workflowConfig.approvedOutputFile,
      approved,
    );
    await this.csvRepository.writeOutput(
      workflowConfig.manualReviewOutputFile,
      manualReview,
    );
    await this.csvRepository.writeOutput(
      workflowConfig.rejectedOutputFile,
      rejected,
    );
    await this.csvRepository.writeOutput(
      workflowConfig.duplicateOutputFile,
      duplicates,
    );
    await this.reportWriter.write(workflowConfig.reportFile, summary, {
      approved: workflowConfig.approvedOutputFile,
      manualReview: workflowConfig.manualReviewOutputFile,
      rejected: workflowConfig.rejectedOutputFile,
      duplicates: workflowConfig.duplicateOutputFile,
    });
    await this.notificationWriter.write(
      workflowConfig.notificationFile,
      summary,
      workflowConfig.reportFile,
    );

    await this.fileLogger.info(`Total approved: ${String(summary.approved)}`);
    await this.fileLogger.info(
      `Total manual review: ${String(summary.manualReview)}`,
    );
    await this.fileLogger.info(`Total rejected: ${String(summary.rejected)}`);
    await this.fileLogger.info(
      `Total duplicated: ${String(summary.duplicates)}`,
    );
    await this.fileLogger.info(
      `Generated files: ${[
        workflowConfig.approvedOutputFile,
        workflowConfig.manualReviewOutputFile,
        workflowConfig.rejectedOutputFile,
        workflowConfig.duplicateOutputFile,
        workflowConfig.reportFile,
        workflowConfig.notificationFile,
      ].join(", ")}`,
    );
    await this.fileLogger.info("Workflow finished");

    return {
      summary,
      reportFile: workflowConfig.reportFile,
      notificationFile: workflowConfig.notificationFile,
      logFile: workflowConfig.logFile,
    };
  }

  private toRejectedRecord(
    request: NormalizedCustomerRequest,
    reasons: string[],
  ): ProcessedCustomerRequest {
    return {
      ...request,
      region: "",
      customerSegment: "",
      priorityScore: null,
      status: "rejected",
      reasons,
    };
  }

  private toDuplicateRecord(
    request: NormalizedCustomerRequest,
  ): ProcessedCustomerRequest {
    return {
      ...request,
      region: "",
      customerSegment: "",
      priorityScore: null,
      status: "duplicate",
      reasons: ["email duplicates a previously accepted record"],
    };
  }

  private countReasons(records: ProcessedCustomerRequest[]): ReasonCount[] {
    const counts = new Map<string, number>();

    for (const record of records) {
      for (const reason of record.reasons) {
        counts.set(reason, (counts.get(reason) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((left, right) => left.reason.localeCompare(right.reason));
  }
}
