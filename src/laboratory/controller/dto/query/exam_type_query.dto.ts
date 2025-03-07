import { ExamTypeFindManyQueryPayload } from "@omega/laboratory/application/query/exam/exam-type-find-many.query";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class ExamTypeFindManyQueryDto implements OrderingQuery<ExamTypeModel>, Omit<ExamTypeFindManyQueryPayload, 'order'> {
    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ExamTypeModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";

    @IsOptional()
    @IsString()
    public readonly filter: string | undefined;

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;
}