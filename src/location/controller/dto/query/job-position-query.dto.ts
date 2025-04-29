import { JobPositionFindManyQueryPayload } from "@omega/location/application/query/job-position/job-position-find-many.query";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class JobPositionFindManyQueryDto implements OrderingQuery<JobPositionModel>, Omit<JobPositionFindManyQueryPayload, 'order'> {
    @IsString()
    @IsOptional()
    public readonly filter?: string;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof JobPositionModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: 'asc' | 'desc';

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;
}