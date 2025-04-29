import { AreaFindManyQueryPayload } from "@omega/location/application/query/area/area-find-many.query";
import { AreaModel } from "@omega/location/core/models/area/area.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class AreaFindManyQueryDto implements OrderingQuery<AreaModel>, Omit<AreaFindManyQueryPayload, 'order'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof AreaModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;
}