import { CorporativeFindManyQueryPayload } from "@omega/location/application/query/corporative/corporative-find-many.query";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class CorporativeFindManyQueryDto implements OrderingQuery<CorporativeModel>, Omit<CorporativeFindManyQueryPayload, 'order'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof CorporativeModel;

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