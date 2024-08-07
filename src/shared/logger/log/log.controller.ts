import { Body, Controller, Get, Inject, Logger, Post } from "@nestjs/common";
import { LogService } from "./log.service";
import { ApiTags } from "@nestjs/swagger";
import { GETLogLevelArrayResponseDto, GETLogsResponseDto } from "./dtos/log.response.dto";
import { plainToInstance } from "class-transformer";
import { POSTLogRequestDto } from "./dtos/log.request.dto";

@ApiTags('Logger')
@Controller('logs')
export class LogController {

    constructor(
        @Inject(LogService) private readonly service: LogService
    ) { }

    @Get('level')
    async finLevels(): Promise<GETLogLevelArrayResponseDto> {
        const levels = await this.service.findLevels();
        return plainToInstance(GETLogLevelArrayResponseDto, { levels });
    }

    @Post()
    async findLogs(
        @Body() body: POSTLogRequestDto
    ): Promise<GETLogsResponseDto> {
        const logs = await this.service.find(body);
        return plainToInstance(GETLogsResponseDto, { logs });
    }
}