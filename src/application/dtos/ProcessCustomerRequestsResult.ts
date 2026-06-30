import type { ProcessingSummary } from "../../domain/entities/CustomerRequest.js";

export interface ProcessCustomerRequestsResult {
  summary: ProcessingSummary;
  reportFile: string;
  notificationFile: string;
  logFile: string;
}
