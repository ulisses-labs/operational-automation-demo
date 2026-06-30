import type { Logger } from "../../shared/logger/Logger.js";

export const bootstrapMessages = [
  "Operational Automation Demo",
  "",
  "Bootstrap completed successfully.",
  "",
  "Ready for workflow implementation.",
] as const;

export class BootstrapApplication {
  public constructor(private readonly logger: Logger) {}

  public run(): void {
    for (const message of bootstrapMessages) {
      this.logger.info(message);
    }
  }
}
