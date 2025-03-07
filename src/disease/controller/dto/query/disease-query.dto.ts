import { DiseaseFindManyQueryPayload } from "@omega/disease/application/query/disease/disease-find-many.query";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class DiseaseFindManyQueryDto implements OrderingQuery<DiseaseModel>, Omit<DiseaseFindManyQueryPayload, 'order' | 'groupId'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof DiseaseModel;

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