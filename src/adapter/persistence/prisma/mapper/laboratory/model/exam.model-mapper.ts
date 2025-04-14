import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamModel as PrismaExamModel } from "@prisma/client";

export class ExamModelMapper {
    static toModel(value: PrismaExamModel): ExamModel {
        return new ExamModel({ ...value });
    }
}