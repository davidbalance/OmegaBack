import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { LogService } from "./log.service";
import { ApiTags } from "@nestjs/swagger";
import { GetLogLevelArrayResponseDto, GetLogsResponseDto } from "./dtos/log.response.dto";
import { plainToInstance } from "class-transformer";
import { PostLogRequestDto } from "./dtos/log.request.dto";

@ApiTags('Logger')
@Controller('logs')
export class LogController {

    constructor(
        @Inject(LogService) private readonly service: LogService
    ) { }

    @Get('level')
    async findLevels(): Promise<GetLogLevelArrayResponseDto> {
        const levels = await this.service.findLevels();
        return plainToInstance(GetLogLevelArrayResponseDto, { levels });
    }

    @Post()
    async findLogs(
        @Body() body: PostLogRequestDto
    ): Promise<GetLogsResponseDto> {
        const logs = await this.service.find(body);
        return plainToInstance(GetLogsResponseDto, { logs });
    }
}