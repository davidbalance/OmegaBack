import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class ExamSubtypeExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): ExamSubtypeExternalConnectionModel {
        return new ExamSubtypeExternalConnectionModel({ ...value });
    }
}