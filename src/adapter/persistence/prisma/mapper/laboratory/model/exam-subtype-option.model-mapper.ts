import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamSubtypeOptionModel as PrismaExamSubtypeOptionModel } from "@prisma/client";

export class ExamSubtypeOptionModelMapper {
    static toModel(value: PrismaExamSubtypeOptionModel): ExamSubtypeOptionModel {
        return new ExamSubtypeOptionModel({ ...value });
    }
}