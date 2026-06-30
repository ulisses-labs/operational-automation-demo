import type {
  EnrichedCustomerRequest,
  ProcessedCustomerRequest,
} from "../entities/CustomerRequest.js";

export class BusinessRulesService {
  public classify(request: EnrichedCustomerRequest): ProcessedCustomerRequest {
    const reasons: string[] = [];

    if (request.phone.length === 0) {
      reasons.push("phone is missing");
    }

    if (request.city.length === 0) {
      reasons.push("city is missing");
    }

    if (request.estimatedValue === null) {
      reasons.push("estimated_value is missing");
    } else if (request.estimatedValue < 100) {
      reasons.push("estimated_value is below minimum manual review threshold");
    }

    return {
      ...request,
      status: reasons.length > 0 ? "manual_review" : "approved",
      reasons,
    };
  }
}
