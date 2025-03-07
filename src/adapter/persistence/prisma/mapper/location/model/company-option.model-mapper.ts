import { CompanyOptionModel } from "@omega/location/core/models/corporative/company-option.model";
import { CompanyOptionModel as PrismaCompanyOptionModel } from "@prisma/client";

export class CompanyOptionModelMapper {
    static toModel(value: PrismaCompanyOptionModel): CompanyOptionModel {
        return new CompanyOptionModel({ ...value });
    }
}