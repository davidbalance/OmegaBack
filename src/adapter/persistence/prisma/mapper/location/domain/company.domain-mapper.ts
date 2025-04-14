import { Company } from "@omega/location/core/domain/corporative/company.domain";
import {
    Company as PrismaCompany,
    CompanyExternalKey as PrismaCompanyExternalKey,
    Prisma
} from "@prisma/client";
import { BranchDomainMapper, PrismaBranchExtended } from "./branch.domain-mapper";
import { CompanyExternalKey } from "@omega/location/core/domain/corporative/value_objects/company-external-key.value-object";

export type PrismaCompanyExtended = PrismaCompany & { branches: PrismaBranchExtended[], externalKeys: PrismaCompanyExternalKey[] }

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

    static toDomain(value: PrismaCompanyExtended): Company {
        return Company.rehydrate({
            ...value,
            branches: value.branches.map(e => BranchDomainMapper.toDomain(e)),
            externalKeys: value.externalKeys.map(e => CompanyExternalKey.create({ ...e }))
        });
    }
}