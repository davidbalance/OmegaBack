import { ManagementFindManyQueryPayload } from "@omega/location/application/query/management/management-find-many.query";
import { ManagementModel } from "@prisma/client";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class ManagementFindManyQueryDto implements OrderingQuery<ManagementModel>, Omit<ManagementFindManyQueryPayload, 'order'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ManagementModel;

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