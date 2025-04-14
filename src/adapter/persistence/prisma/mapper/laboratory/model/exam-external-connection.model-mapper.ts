import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class ExamExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): ExamExternalConnectionModel {
        return new ExamExternalConnectionModel({ ...value });
    }
}