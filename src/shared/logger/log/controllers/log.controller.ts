import { Controller, Get, Inject } from "@nestjs/common";
import { LogService } from "../log.service";
import { ApiTags } from "@nestjs/swagger";
import { GetLogLevelArrayResponseDto } from "../dtos/log.response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags('Logger')
@Controller('logs')
export class LogController {

    constructor(
        @Inject(LogService) private readonly service: LogService
    ) { }

    @Get('level')
    async findLevels(): Promise<GetLogLevelArrayResponseDto> {
        const data = await this.service.findLevels();
        return plainToInstance(GetLogLevelArrayResponseDto, { data });
    }
}