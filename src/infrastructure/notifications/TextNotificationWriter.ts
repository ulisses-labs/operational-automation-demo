import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { ProcessingSummary } from "../../domain/entities/CustomerRequest.js";

export class TextNotificationWriter {
  public async write(
    filePath: string,
    summary: ProcessingSummary,
    reportPath: string,
  ): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const content = [
      "Daily customer request batch processed.",
      "",
      `Approved: ${String(summary.approved)}`,
      `Manual review: ${String(summary.manualReview)}`,
      `Rejected: ${String(summary.rejected)}`,
      `Duplicates: ${String(summary.duplicates)}`,
      "",
      `Report: ${reportPath}`,
      "",
    ].join("\n");

    await writeFile(filePath, content, "utf8");
  }
}
