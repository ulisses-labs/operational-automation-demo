import type {
  EnrichedCustomerRequest,
  NormalizedCustomerRequest,
} from "../../domain/entities/CustomerRequest.js";

export class FakeCustomerEnrichmentProvider {
  public enrich(request: NormalizedCustomerRequest): EnrichedCustomerRequest {
    return {
      ...request,
      region: this.regionForCity(request.city),
      customerSegment: this.segmentForValue(request.estimatedValue),
      priorityScore: this.priorityFor(request),
    };
  }

  private regionForCity(city: string): string {
    const normalizedCity = city
      .normalize("NFD")
      .replaceAll(/\p{Diacritic}/gu, "")
      .toLowerCase();

    if (["sao paulo", "rio de janeiro", "belo horizonte"].includes(normalizedCity)) {
      return "Southeast";
    }

    if (["curitiba", "porto alegre", "florianopolis"].includes(normalizedCity)) {
      return "South";
    }

    if (["salvador", "recife", "fortaleza"].includes(normalizedCity)) {
      return "Northeast";
    }

    if (["brasilia", "goiania"].includes(normalizedCity)) {
      return "Center-West";
    }

    return "Unknown";
  }

  private segmentForValue(value: number | null): string {
    if (value !== null && value >= 5_000) {
      return "enterprise";
    }

    if (value !== null && value >= 1_000) {
      return "business";
    }

    return "small";
  }

  private priorityFor(request: NormalizedCustomerRequest): number {
    const typeScores = new Map<string, number>([
      ["upgrade", 35],
      ["onboarding", 25],
      ["billing", 20],
      ["support", 15],
      ["cancellation", 10],
    ]);
    const valueScore =
      request.estimatedValue === null
        ? 0
        : Math.min(50, Math.floor(request.estimatedValue / 200));
    const baseScore = typeScores.get(request.requestType) ?? 5;

    return Math.max(1, Math.min(100, baseScore + valueScore));
  }
}
