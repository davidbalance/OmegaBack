import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { JobPositionFindOneQuery } from "@omega/location/application/query/job-position/job-position-find-one.query";
import { JobPositionFindManyQuery } from "@omega/location/application/query/job-position/job-position-find-many.query";
import { JobPositionFindOptionsQuery } from "@omega/location/application/query/job-position/job-position-find-options.query";
import { JobPositionModelMapper } from "../mapper/job_position_model.mapper";
import { JobPositionManyResponseDto, JobPositionOptionResponseDto, JobPositionResponseDto } from "../dto/response/job_position.dto";
import { JobPositionFindManyQueryDto } from "../dto/query/job_position_query.dto";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('job-positions')
export class JobPositionReadController {
    constructor(
        @InjectQuery('JobPositionFindOne') private readonly findOneQuery: JobPositionFindOneQuery,
        @InjectQuery('JobPositionFindMany') private readonly findManyQuery: JobPositionFindManyQuery,
        @InjectQuery('JobPositionFindOptions') private readonly findOptionQuery: JobPositionFindOptionsQuery
    ) { }

    @Get('job-position/:jobPositionId')
    async findOne(
        @Param('jobPositionId') jobPositionId: string,
    ): Promise<JobPositionResponseDto> {
        const value = await this.findOneQuery.handleAsync({ jobPositionId });
        const data = JobPositionModelMapper.toDTO(value);
        return plainToInstance(JobPositionResponseDto, data);
    }

    @Get()
    async findMany(
        @Query() query: JobPositionFindManyQueryDto
    ): Promise<JobPositionManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => JobPositionModelMapper.toDTO(e));
        return plainToInstance(JobPositionManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<JobPositionOptionResponseDto[]> {
        const data = await this.findOptionQuery.handleAsync();
        return plainToInstance(JobPositionOptionResponseDto, data);
    }
}