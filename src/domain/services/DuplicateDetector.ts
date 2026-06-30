import type { NormalizedCustomerRequest } from "../entities/CustomerRequest.js";

export class DuplicateDetector {
  private readonly seenEmails = new Set<string>();

  public isDuplicate(request: NormalizedCustomerRequest): boolean {
    if (this.seenEmails.has(request.email)) {
      return true;
    }

    this.seenEmails.add(request.email);

    return false;
  }
}
