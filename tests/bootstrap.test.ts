import { describe, expect, it } from "vitest";

import {
  BootstrapApplication,
  bootstrapMessages,
} from "../src/application/bootstrap/BootstrapApplication.js";
import type { Logger } from "../src/shared/logger/Logger.js";

class InMemoryLogger implements Logger {
  public readonly messages: string[] = [];

  public info(message: string): void {
    this.messages.push(message);
  }

  public error(message: string): void {
    this.messages.push(message);
  }
}

describe("BootstrapApplication", () => {
  it("prints the bootstrap readiness message", () => {
    const logger = new InMemoryLogger();
    const application = new BootstrapApplication(logger);

    application.run();

    expect(logger.messages).toEqual([...bootstrapMessages]);
  });
});
