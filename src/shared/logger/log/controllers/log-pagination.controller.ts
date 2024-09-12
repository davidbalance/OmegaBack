import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { LogPaginationService } from "../log-pagination.service";
import { LogCountMeta, LogFilterMeta } from "../dtos/log.filter.dto";
import dayjs from "dayjs";
import { GetLogArrayResponseDto } from "../dtos/log.response.dto";

@ApiTags('Logger')
@Controller('logs')
export class LogPaginationController {

    constructor(
        @Inject(LogPaginationService) private readonly service: LogPaginationService
    ) { }

    @Get('paginate')
    async find(
        @Query() { fromDate, toDate, level, ...query }: LogFilterMeta
    ): Promise<GetLogArrayResponseDto> {
        const data = await this.service.find(query, {
            fromDate: dayjs(fromDate).toDate(),
            toDate: dayjs(toDate).toDate(),
            level
        });
        return plainToInstance(GetLogArrayResponseDto, { data });
    }

    @Get('pages')
    async count(
        @Query() { fromDate, toDate, level, ...query }: LogCountMeta
    ): Promise<PageResponseDto> {
        const pages = await this.service.count(query, {
            fromDate: dayjs(fromDate).toDate(),
            toDate: dayjs(toDate).toDate(),
            level
        });
        return plainToInstance(PageResponseDto, { pages });
    }
}