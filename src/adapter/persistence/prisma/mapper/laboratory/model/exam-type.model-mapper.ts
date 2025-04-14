import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeModel as PrismaExamTypeModel } from "@prisma/client";

export class ExamTypeModelMapper {
    static toModel(value: PrismaExamTypeModel): ExamTypeModel {
        return new ExamTypeModel({ ...value });
    }
}