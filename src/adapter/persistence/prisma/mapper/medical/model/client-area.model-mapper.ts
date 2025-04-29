import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaModel as PrismaClientAreaModel } from "@prisma/client";

export class ClientAreaModelMapper {
    static toModel(value: PrismaClientAreaModel): ClientAreaModel {
        return new ClientAreaModel({ ...value });
    }
}