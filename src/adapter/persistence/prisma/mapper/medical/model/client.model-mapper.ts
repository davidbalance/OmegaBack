import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientModel as PrismaClientModel } from "@prisma/client";

export class ClientModelMapper {
    static toModel(value: Omit<PrismaClientModel, 'companyRuc'>): ClientModel {
        return new ClientModel({
            ...value,
            companyRuc: ''
        });
    }
}