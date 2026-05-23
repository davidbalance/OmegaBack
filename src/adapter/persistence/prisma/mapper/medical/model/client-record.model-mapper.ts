import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordModel as PrismaClientRecordModel } from "@prisma/client";

export class ClientRecordModelMapper {
    static toModel(value: PrismaClientRecordModel): ClientRecordModel {
        return new ClientRecordModel({ ...value });
    }
}