import type {
  NormalizedCustomerRequest,
  RawCustomerRequest,
} from "../entities/CustomerRequest.js";

export class NormalizationService {
  public normalize(request: RawCustomerRequest): NormalizedCustomerRequest {
    const estimatedValueRaw = request.estimated_value.trim();

    return {
      requestId: request.request_id.trim(),
      customerName: this.toTitleCase(this.compactSpaces(request.customer_name)),
      email: request.email.trim().toLowerCase(),
      phone: request.phone.replaceAll(/\D/g, ""),
      city: this.toTitleCase(this.compactSpaces(request.city)),
      requestType: request.request_type.trim().toLowerCase(),
      estimatedValue:
        estimatedValueRaw.length > 0 ? Number(estimatedValueRaw) : null,
      estimatedValueRaw,
      submittedAt: request.submitted_at.trim(),
    };
  }

  private compactSpaces(value: string): string {
    return value.trim().replaceAll(/\s+/g, " ");
  }

  private toTitleCase(value: string): string {
    return value
      .split(" ")
      .filter((part) => part.length > 0)
      .map((part) => {
        const [first = "", ...rest] = part.toLocaleLowerCase();

        return `${first.toLocaleUpperCase()}${rest.join("")}`;
      })
      .join(" ");
  }
}
