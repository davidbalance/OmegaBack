import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { LogService } from "./log.service";
import { ApiTags } from "@nestjs/swagger";
import { FindLogs } from "./dtos/log.response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags('Logger')
@Controller('logs')
export class LogController {

    private logger = new Logger();
    constructor(
        @Inject(LogService) private readonly service: LogService
    ) { }

    @Get()
    async findLogs(): Promise<FindLogs> {
        const logs = await this.service.find();
        return plainToInstance(FindLogs, { logs });
    }
}