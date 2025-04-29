import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";
import { ClientManagementModel as PrismaClientManagementModel } from "@prisma/client";

export class ClientManagementModelMapper {
    static toModel(value: PrismaClientManagementModel): ClientManagementModel {
        return new ClientManagementModel({ ...value });
    }
}