import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyModel as PrismaCompanyOptionModel } from "@prisma/client";

export class CompanyModelMapper {
    static toModel(value: PrismaCompanyOptionModel): CompanyModel {
        return new CompanyModel({ ...value });
    }
}