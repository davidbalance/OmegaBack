import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementModel as PrismaManagementModel } from "@prisma/client";

export class ManagementModelMapper {
    static toModel(value: PrismaManagementModel): ManagementModel {
        return new ManagementModel({ ...value });
    }
}