import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { LoggerResponseDto } from "../response/logger.dto";

export class LoggerMapper {
    static toDTO(value: LoggerModel): LoggerResponseDto {
        return {
            level: value.level,
            message: value.message,
            timestamp: value.timestamp
        }
    }
}