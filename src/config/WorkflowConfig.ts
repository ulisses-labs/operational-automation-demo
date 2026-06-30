export const workflowConfig = {
  inputFile: "data/input/customer_requests.csv",
  approvedOutputFile: "data/output/approved_requests.csv",
  manualReviewOutputFile: "data/output/manual_review_requests.csv",
  rejectedOutputFile: "data/output/rejected_requests.csv",
  duplicateOutputFile: "data/output/duplicate_requests.csv",
  reportFile: "reports/processing_report.md",
  notificationFile: "notifications/processing_summary.txt",
  logFile: "logs/automation.log",
} as const;
