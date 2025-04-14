import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class ExamTypeExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): ExamTypeExternalConnectionModel {
        return new ExamTypeExternalConnectionModel({ ...value });
    }
}