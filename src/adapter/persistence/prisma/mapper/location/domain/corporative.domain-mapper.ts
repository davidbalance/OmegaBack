import {
    Prisma,
    CorporativeGroup as PrismaCorporativeGroup,
    CorporativeExternalKey as PrismaCorporativeExternalKey,
} from "@prisma/client";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CompanyDomainMapper, PrismaCompanyExtended } from "./company.domain-mapper";
import { CorporativeExternalKey } from "@omega/location/core/domain/corporative/value_objects/corporative-external-key.value-object";

type PrismaCorporativeExtended = PrismaCorporativeGroup & {
    companies: PrismaCompanyExtended[],
    externalKeys: PrismaCorporativeExternalKey[],
}

export class CorporativeDomainMapper {
    static toPrisma(value: Corporative): Prisma.CorporativeGroupUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaCorporativeExtended): Corporative {
        return Corporative.rehydrate({
            ...value,
            companies: value.companies.map(e => CompanyDomainMapper.toDomain(e)),
            externalKeys: value.externalKeys.map(e => CorporativeExternalKey.create({ ...e }))
        });
    }
}