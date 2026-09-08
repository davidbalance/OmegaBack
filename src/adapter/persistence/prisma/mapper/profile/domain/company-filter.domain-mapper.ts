import { CompanyFilter } from "@omega/profile/core/domain/user/company-filter.domain";
import { CompanyFilter as PrismaCompanyFilter, Prisma } from "@prisma/client";

export class CompanyFilterDomainMapper {
    static toPrisma(value: CompanyFilter): Prisma.CompanyFilterUncheckedCreateInput {
        return {
            id: value.id,
            companyId: value.companyId,
            companyRuc: value.companyRuc,
            corporativeId: value.corporativeId,
            corporativeName: value.corporativeName,
            userId: value.userId,
        }
    }

    static toDomain(value: PrismaCompanyFilter): CompanyFilter {
        return CompanyFilter.rehydrate({ ...value });
    }
}