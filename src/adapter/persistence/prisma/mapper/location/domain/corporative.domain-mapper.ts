import { CorporativeGroup as PrismaCorporativeGroup, Company as PrismaCompany, Prisma, Branch as PrismaBranch } from "@prisma/client";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CompanyDomainMapper } from "./company.domain-mapper";

type PrismaCompanyWithBranches = PrismaCompany & { branches: PrismaBranch[] }
type PrismaCorporativeGroupWithCompanies = PrismaCorporativeGroup & { companies: PrismaCompanyWithBranches[] }

export class CorporativeDomainMapper {
    static toPrisma(value: Corporative): Prisma.CorporativeGroupUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaCorporativeGroupWithCompanies): Corporative {
        return Corporative.rehydrate({
            ...value,
            companies: value.companies.map(e => CompanyDomainMapper.toDomain(e))
        });
    }
}