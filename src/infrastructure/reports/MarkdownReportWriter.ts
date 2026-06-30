import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { ProcessingSummary } from "../../domain/entities/CustomerRequest.js";

interface ReportFiles {
  approved: string;
  manualReview: string;
  rejected: string;
  duplicates: string;
}

export class MarkdownReportWriter {
  public async write(
    filePath: string,
    summary: ProcessingSummary,
    outputFiles: ReportFiles,
  ): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const content = [
      "# Processing Report",
      "",
      "## Summary",
      `- Input records: ${String(summary.inputRecords)}`,
      `- Approved: ${String(summary.approved)}`,
      `- Manual review: ${String(summary.manualReview)}`,
      `- Rejected: ${String(summary.rejected)}`,
      `- Duplicates: ${String(summary.duplicates)}`,
      `- Enriched: ${String(summary.enriched)}`,
      `- Processing time: ${String(summary.processingTimeMs)}ms`,
      "",
      "## Output Files",
      `- Approved: ${outputFiles.approved}`,
      `- Manual review: ${outputFiles.manualReview}`,
      `- Rejected: ${outputFiles.rejected}`,
      `- Duplicates: ${outputFiles.duplicates}`,
      "",
      "## Rejection Reasons",
      ...this.reasonLines(summary.rejectionReasons),
      "",
      "## Manual Review Reasons",
      ...this.reasonLines(summary.manualReviewReasons),
      "",
      "## Notes",
      "- No real data was used.",
      "- This is a local demo workflow.",
      "",
    ].join("\n");

    await writeFile(filePath, content, "utf8");
  }

  private reasonLines(reasons: ProcessingSummary["rejectionReasons"]): string[] {
    if (reasons.length === 0) {
      return ["- None"];
    }

    return reasons.map(({ reason, count }) => `- ${reason}: ${String(count)}`);
  }
}
