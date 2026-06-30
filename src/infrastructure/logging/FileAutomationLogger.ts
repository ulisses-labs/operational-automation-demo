import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export class FileAutomationLogger {
  public constructor(private readonly filePath: string) {}

  public async reset(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, "", "utf8");
  }

  public async info(message: string): Promise<void> {
    const timestamp = new Date().toISOString();

    await appendFile(this.filePath, `[${timestamp}] ${message}\n`, "utf8");
  }
}
