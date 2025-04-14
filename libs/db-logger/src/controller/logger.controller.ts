import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "../nest/inject/query.inject";
import { ReadLoggerQuery } from "../application/query/read_logger.query";
import { LoggerQueryDto } from "./dto/query/logger_query.dto";
import { LoggerLevelResponseDto, LoggerManyResponseDto } from "./dto/response/logger.dto";
import { LoggerMapper } from "./dto/mapper/logger.mapper";
import { plainToInstance } from "class-transformer";
import { ReadLoggerLevelsQuery } from "../application/query/read-logger-levels.query";
import { LoggerLevelMapper } from "./dto/mapper/logger-level.mapper";

@ApiTags('Logger', 'Read')
@Controller('logger')
export class LoggerController {
    constructor(
        @InjectQuery('ReadLogger') private readonly read: ReadLoggerQuery,
        @InjectQuery('ReadLoggerLevel') private readonly readLevels: ReadLoggerLevelsQuery,
    ) { }

    @Get()
    async findMany(
        @Query() query: LoggerQueryDto
    ): Promise<LoggerManyResponseDto> {
        const value = await this.read.handleAsync({ ...query });
        const data = value.data.map(e => LoggerMapper.toDTO(e));
        return plainToInstance(LoggerManyResponseDto, { ...value, data });
    }

    @Get('levels')
    async findLevels(
    ): Promise<LoggerLevelResponseDto[]> {
        const value = await this.readLevels.handleAsync();
        const data = value.map(e => LoggerLevelMapper.toDTO(e));
        return plainToInstance(LoggerLevelResponseDto, data);
    }
}