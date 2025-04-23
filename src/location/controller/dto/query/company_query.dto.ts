import { CompanyFindManyQueryPayload } from "@omega/location/application/query/corporative/company-find-many.query";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class CompanyFindManyQueryDto implements OrderingQuery<CompanyModel>, Omit<CompanyFindManyQueryPayload, 'corporativeId' | 'order'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof CompanyModel;

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