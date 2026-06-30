export const acceptedRequestTypes = [
  "support",
  "onboarding",
  "upgrade",
  "cancellation",
  "billing",
] as const;

export type RequestType = (typeof acceptedRequestTypes)[number];

export type ProcessingStatus =
  | "approved"
  | "manual_review"
  | "rejected"
  | "duplicate";

export interface RawCustomerRequest {
  request_id: string;
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  request_type: string;
  estimated_value: string;
  submitted_at: string;
}

export interface NormalizedCustomerRequest {
  requestId: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  requestType: string;
  estimatedValue: number | null;
  estimatedValueRaw: string;
  submittedAt: string;
}

export interface EnrichedCustomerRequest extends NormalizedCustomerRequest {
  region: string;
  customerSegment: string;
  priorityScore: number;
}

export interface ProcessedCustomerRequest extends NormalizedCustomerRequest {
  region: string;
  customerSegment: string;
  priorityScore: number | null;
  status: ProcessingStatus;
  reasons: string[];
}

export interface ReasonCount {
  reason: string;
  count: number;
}

export interface ProcessingSummary {
  inputRecords: number;
  approved: number;
  manualReview: number;
  rejected: number;
  duplicates: number;
  enriched: number;
  processingTimeMs: number;
  rejectionReasons: ReasonCount[];
  manualReviewReasons: ReasonCount[];
}
