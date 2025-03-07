import { ExamSubtypeFindManyQueryPayload } from "@omega/laboratory/application/query/exam/exam-subtype-find-many.query";
import { ExamSubtypeModel } from "@prisma/client";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class ExamSubtypeFindManyQueryDto implements OrderingQuery<ExamSubtypeModel>, Omit<ExamSubtypeFindManyQueryPayload, 'typeId' | 'orderId'> {
    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ExamSubtypeModel;

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