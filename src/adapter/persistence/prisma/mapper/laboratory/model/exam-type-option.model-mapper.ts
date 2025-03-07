import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeOptionModel as PrismaExamTypeOptionModel } from "@prisma/client";

export class ExamTypeOptionModelMapper {
    static toModel(value: PrismaExamTypeOptionModel): ExamTypeOptionModel {
        return new ExamTypeOptionModel({ ...value });
    }
}