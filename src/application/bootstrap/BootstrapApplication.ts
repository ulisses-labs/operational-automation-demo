import type { Logger } from "../../shared/logger/Logger.js";
import type { ProcessCustomerRequestsUseCase } from "../use-cases/ProcessCustomerRequestsUseCase.js";

export class BootstrapApplication {
  public constructor(
    private readonly logger: Logger,
    private readonly processCustomerRequestsUseCase: ProcessCustomerRequestsUseCase,
  ) {}

  public async run(): Promise<void> {
    this.logger.info("Operational Automation Demo");
    this.logger.info("");
    this.logger.info("Processing batch: data/input/customer_requests.csv");
    this.logger.info("");

    const result = await this.processCustomerRequestsUseCase.execute();

    this.logger.info(`Approved: ${String(result.summary.approved)}`);
    this.logger.info(`Manual review: ${String(result.summary.manualReview)}`);
    this.logger.info(`Rejected: ${String(result.summary.rejected)}`);
    this.logger.info(`Duplicates: ${String(result.summary.duplicates)}`);
    this.logger.info("");
    this.logger.info(`Report: ${result.reportFile}`);
    this.logger.info(`Notification: ${result.notificationFile}`);
    this.logger.info(`Log: ${result.logFile}`);
  }
}
