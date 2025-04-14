import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeModel as PrismaExamSubtypeModel } from "@prisma/client";

export class ExamSubtypeModelMapper {
    static toModel(value: PrismaExamSubtypeModel): ExamSubtypeModel {
        return new ExamSubtypeModel({ ...value });
    }
}