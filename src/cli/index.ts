import { BootstrapApplication } from "../application/bootstrap/BootstrapApplication.js";
import { ProcessCustomerRequestsUseCase } from "../application/use-cases/ProcessCustomerRequestsUseCase.js";
import { workflowConfig } from "../config/WorkflowConfig.js";
import { BusinessRulesService } from "../domain/services/BusinessRulesService.js";
import { NormalizationService } from "../domain/services/NormalizationService.js";
import { ValidationService } from "../domain/services/ValidationService.js";
import { CustomerRequestCsvRepository } from "../infrastructure/csv/CustomerRequestCsvRepository.js";
import { FakeCustomerEnrichmentProvider } from "../infrastructure/enrichment/FakeCustomerEnrichmentProvider.js";
import { FileAutomationLogger } from "../infrastructure/logging/FileAutomationLogger.js";
import { ConsoleLogger } from "../infrastructure/logger/ConsoleLogger.js";
import { TextNotificationWriter } from "../infrastructure/notifications/TextNotificationWriter.js";
import { MarkdownReportWriter } from "../infrastructure/reports/MarkdownReportWriter.js";

const logger = new ConsoleLogger();
const processCustomerRequestsUseCase = new ProcessCustomerRequestsUseCase(
  new CustomerRequestCsvRepository(),
  new NormalizationService(),
  new ValidationService(),
  new BusinessRulesService(),
  new FakeCustomerEnrichmentProvider(),
  new MarkdownReportWriter(),
  new TextNotificationWriter(),
  new FileAutomationLogger(workflowConfig.logFile),
);
const application = new BootstrapApplication(logger, processCustomerRequestsUseCase);

try {
  await application.run();
} catch (error) {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
