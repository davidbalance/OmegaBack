import { ExamFindManyQueryPayload } from "@omega/laboratory/application/query/exam/exam-find-many.query";
import { ExamModel } from "@prisma/client";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class ExamFindManyQueryDto implements OrderingQuery<ExamModel>, Omit<ExamFindManyQueryPayload, 'subtypeId'> {
    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ExamModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";

    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;
}