import type { Logger } from "../../shared/logger/Logger.js";

export class ConsoleLogger implements Logger {
  public info(message: string): void {
    console.log(message);
  }

  public error(message: string): void {
    console.error(message);
  }
}
