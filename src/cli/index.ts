import { BootstrapApplication } from "../application/bootstrap/BootstrapApplication.js";
import { ConsoleLogger } from "../infrastructure/logger/ConsoleLogger.js";

const logger = new ConsoleLogger();
const application = new BootstrapApplication(logger);

application.run();
