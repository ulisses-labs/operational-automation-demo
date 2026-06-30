import {
  acceptedRequestTypes,
  type NormalizedCustomerRequest,
} from "../entities/CustomerRequest.js";

const acceptedRequestTypeSet = new Set<string>(acceptedRequestTypes);

export class ValidationService {
  public validate(request: NormalizedCustomerRequest): string[] {
    const reasons: string[] = [];

    if (request.customerName.length === 0) {
      reasons.push("customer_name is required");
    }

    if (request.email.length === 0) {
      reasons.push("email is required");
    } else if (!this.hasBasicEmailFormat(request.email)) {
      reasons.push("email has invalid format");
    }

    if (request.requestType.length === 0) {
      reasons.push("request_type is required");
    } else if (!acceptedRequestTypeSet.has(request.requestType)) {
      reasons.push("request_type is not accepted");
    }

    if (
      request.estimatedValueRaw.length > 0 &&
      !Number.isFinite(request.estimatedValue)
    ) {
      reasons.push("estimated_value must be numeric when provided");
    }

    if (request.submittedAt.length === 0) {
      reasons.push("submitted_at is required");
    }

    return reasons;
  }

  public hasBasicEmailFormat(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
