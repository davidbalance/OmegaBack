import { INestApplication, Logger } from "@nestjs/common";
import loggerMiddleware from "../middleware/logger.middleware";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

export function setupLogger<T>(app: INestApplication<T>) {
    app.use(loggerMiddleware);
    const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
}