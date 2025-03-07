import { Company } from "@omega/location/core/domain/corporative/company.domain";
import { Company as PrismaCompany, Prisma, Branch as PrismaBranch } from "@prisma/client";
import { BranchDomainMapper } from "./branch.domain-mapper";

type PrismaCompanyWithBranches = PrismaCompany & { branches: PrismaBranch[] }

export class CompanyDomainMapper {
    static toPrisma(value: Company): Prisma.CompanyUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            address: value.address,
            phone: value.phone,
            ruc: value.ruc,
            corporativeId: value.corporativeId
        };
    }

    static toDomain(value: PrismaCompanyWithBranches): Company {
        return Company.rehydrate({
            ...value,
            branches: value.branches.map(e => BranchDomainMapper.toDomain(e))
        });
    }
}