import { DiseaseGroupFindManyQueryPayload } from "@omega/disease/application/query/disease/disease-group-find-many.query";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class DiseaseGroupFindManyQueryDto implements OrderingQuery<DiseaseGroupModel>, Omit<DiseaseGroupFindManyQueryPayload, 'order'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof DiseaseGroupModel;

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