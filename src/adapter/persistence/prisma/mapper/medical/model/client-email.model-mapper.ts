import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailModel as PrismaClientEmailModel } from "@prisma/client";

export class ClientEmailModelMapper {
    static toModel(value: PrismaClientEmailModel): ClientEmailModel {
        return new ClientEmailModel({ ...value });
    }
}