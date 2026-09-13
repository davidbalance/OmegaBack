import { CompanyFilterModel } from "@omega/profile/core/model/user/company-filter.model";
import { CompanyFilterModel as PrismaCompanyFilterModel } from "@prisma/client";

export class CompanyFilterModelMapper {
    static toModel(value: PrismaCompanyFilterModel): CompanyFilterModel {
        return new CompanyFilterModel({ ...value });
    }
}