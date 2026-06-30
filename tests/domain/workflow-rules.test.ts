import { describe, expect, it } from "vitest";

import type { EnrichedCustomerRequest } from "../../src/domain/entities/CustomerRequest.js";
import { BusinessRulesService } from "../../src/domain/services/BusinessRulesService.js";
import { DuplicateDetector } from "../../src/domain/services/DuplicateDetector.js";
import { NormalizationService } from "../../src/domain/services/NormalizationService.js";
import { ValidationService } from "../../src/domain/services/ValidationService.js";

const normalizationService = new NormalizationService();
const validationService = new ValidationService();
const businessRulesService = new BusinessRulesService();

function validRequest(overrides: Partial<EnrichedCustomerRequest> = {}): EnrichedCustomerRequest {
  return {
    requestId: "REQ-001",
    customerName: "Ana Silva",
    email: "ana@example.com",
    phone: "11999990000",
    city: "Sao Paulo",
    requestType: "support",
    estimatedValue: 500,
    estimatedValueRaw: "500",
    submittedAt: "2026-06-01T09:00:00Z",
    region: "Southeast",
    customerSegment: "small",
    priorityScore: 17,
    ...overrides,
  };
}

describe("workflow rules", () => {
  it("normalizes email", () => {
    const request = normalizationService.normalize({
      request_id: "REQ-001",
      customer_name: "Ana Silva",
      email: " ANA.SILVA@EXAMPLE.COM ",
      phone: "11999990000",
      city: "Sao Paulo",
      request_type: "support",
      estimated_value: "500",
      submitted_at: "2026-06-01T09:00:00Z",
    });

    expect(request.email).toBe("ana.silva@example.com");
  });

  it("normalizes phone", () => {
    const request = normalizationService.normalize({
      request_id: "REQ-001",
      customer_name: "Ana Silva",
      email: "ana@example.com",
      phone: "+55 (11) 99999-0000",
      city: "Sao Paulo",
      request_type: "support",
      estimated_value: "500",
      submitted_at: "2026-06-01T09:00:00Z",
    });

    expect(request.phone).toBe("5511999990000");
  });

  it("validates invalid email", () => {
    const request = normalizationService.normalize({
      request_id: "REQ-001",
      customer_name: "Ana Silva",
      email: "invalid-email",
      phone: "11999990000",
      city: "Sao Paulo",
      request_type: "support",
      estimated_value: "500",
      submitted_at: "2026-06-01T09:00:00Z",
    });

    expect(validationService.validate(request)).toContain(
      "email has invalid format",
    );
  });

  it("detects duplicate normalized emails", () => {
    const duplicateDetector = new DuplicateDetector();
    const first = normalizationService.normalize({
      request_id: "REQ-001",
      customer_name: "Ana Silva",
      email: "ANA@example.com",
      phone: "11999990000",
      city: "Sao Paulo",
      request_type: "support",
      estimated_value: "500",
      submitted_at: "2026-06-01T09:00:00Z",
    });
    const second = normalizationService.normalize({
      request_id: "REQ-002",
      customer_name: "Ana Duplicate",
      email: " ana@example.com ",
      phone: "11999990001",
      city: "Sao Paulo",
      request_type: "billing",
      estimated_value: "700",
      submitted_at: "2026-06-01T10:00:00Z",
    });

    expect(duplicateDetector.isDuplicate(first)).toBe(false);
    expect(duplicateDetector.isDuplicate(second)).toBe(true);
  });

  it("classifies approved records", () => {
    const result = businessRulesService.classify(validRequest());

    expect(result.status).toBe("approved");
    expect(result.reasons).toEqual([]);
  });

  it("classifies manual_review records", () => {
    const result = businessRulesService.classify(
      validRequest({ phone: "", estimatedValue: 80, estimatedValueRaw: "80" }),
    );

    expect(result.status).toBe("manual_review");
    expect(result.reasons).toContain("phone is missing");
    expect(result.reasons).toContain(
      "estimated_value is below minimum manual review threshold",
    );
  });

  it("classifies rejected records through validation", () => {
    const request = normalizationService.normalize({
      request_id: "REQ-001",
      customer_name: "",
      email: "ana@example.com",
      phone: "11999990000",
      city: "Sao Paulo",
      request_type: "unknown",
      estimated_value: "500",
      submitted_at: "",
    });

    expect(validationService.validate(request)).toEqual([
      "customer_name is required",
      "request_type is not accepted",
      "submitted_at is required",
    ]);
  });
});
