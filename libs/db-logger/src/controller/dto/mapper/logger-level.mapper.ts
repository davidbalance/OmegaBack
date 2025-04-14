import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { LoggerLevelResponseDto } from "../response/logger.dto";

export class LoggerLevelMapper {
    static toDTO(value: LoggerLevelModel): LoggerLevelResponseDto {
        return {
            level: value.level,
        }
    }
}