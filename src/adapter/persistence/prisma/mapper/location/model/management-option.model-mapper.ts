import { ManagementOptionModel } from "@omega/location/core/models/management/management-option.model";
import { ManagementOptionModel as PrismaManagementOptionModel } from "@prisma/client";

export class ManagementOptionModelMapper {
    static toModel(value: PrismaManagementOptionModel): ManagementOptionModel {
        return new ManagementOptionModel({ ...value });
    }
}