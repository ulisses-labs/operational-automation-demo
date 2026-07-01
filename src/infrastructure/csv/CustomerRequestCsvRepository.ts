import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type {
  ProcessedCustomerRequest,
  RawCustomerRequest,
} from "../../domain/entities/CustomerRequest.js";

const outputHeaders = [
  "request_id",
  "customer_name",
  "email",
  "phone",
  "city",
  "request_type",
  "estimated_value",
  "submitted_at",
  "region",
  "customer_segment",
  "priority_score",
  "status",
  "reasons",
] as const;

export class CustomerRequestCsvRepository {
  public async readInput(filePath: string): Promise<RawCustomerRequest[]> {
    const content = await readFile(filePath, "utf8");
    const rows = this.parse(content);
    const [headers, ...records] = rows;

    if (headers === undefined) {
      return [];
    }

    return records
      .filter((record) => record.some((value) => value.trim().length > 0))
      .map((record) => this.toRawRequest(headers, record));
  }

  public async writeOutput(
    filePath: string,
    records: ProcessedCustomerRequest[],
  ): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const rows = [
      [...outputHeaders],
      ...records.map((record) => [
        record.requestId,
        record.customerName,
        record.email,
        record.phone,
        record.city,
        record.requestType,
        record.estimatedValue === null ? "" : String(record.estimatedValue),
        record.submittedAt,
        record.region,
        record.customerSegment,
        record.priorityScore === null ? "" : String(record.priorityScore),
        record.status,
        record.reasons.join("; "),
      ]),
    ];

    await writeFile(filePath, this.stringify(rows), "utf8");
  }

  private toRawRequest(
    headers: string[],
    record: string[],
  ): RawCustomerRequest {
    const values = new Map<string, string>();

    headers.forEach((header, index) => {
      values.set(header, record[index] ?? "");
    });

    return {
      request_id: values.get("request_id") ?? "",
      customer_name: values.get("customer_name") ?? "",
      email: values.get("email") ?? "",
      phone: values.get("phone") ?? "",
      city: values.get("city") ?? "",
      request_type: values.get("request_type") ?? "",
      estimated_value: values.get("estimated_value") ?? "",
      submitted_at: values.get("submitted_at") ?? "",
    };
  }

  private parse(content: string): string[][] {
    const rows: string[][] = [];
    let currentField = "";
    let currentRow: string[] = [];
    let inQuotes = false;

    for (let index = 0; index < content.length; index += 1) {
      const character = content[index] ?? "";
      const nextCharacter = content[index + 1];

      if (character === '"' && inQuotes && nextCharacter === '"') {
        currentField += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = !inQuotes;
      } else if (character === "," && !inQuotes) {
        currentRow.push(currentField);
        currentField = "";
      } else if (character === "\n" && !inQuotes) {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else if (character !== "\r") {
        currentField += character;
      }
    }

    if (currentField.length > 0 || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    return rows;
  }

  private stringify(rows: string[][]): string {
    return `${rows.map((row) => row.map((value) => this.escape(value)).join(",")).join("\n")}\n`;
  }

  private escape(value: string): string {
    if ([",", '"', "\n"].some((character) => value.includes(character))) {
      return `"${value.replaceAll('"', '""')}"`;
    }

    return value;
  }
}
