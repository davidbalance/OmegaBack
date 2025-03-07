import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientModel as PrismaClientModel } from "@prisma/client";

export class ClientModelMapper {
    static toModel(value: PrismaClientModel): ClientModel {
        return new ClientModel({
            ...value,
            companyRuc: value.companyRuc ?? ''
        });
    }
}