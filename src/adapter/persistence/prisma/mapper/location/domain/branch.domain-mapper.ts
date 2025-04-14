import { Branch } from "@omega/location/core/domain/corporative/branch.domain";
import { BranchExternalKey } from "@omega/location/core/domain/corporative/value_objects/branch-external-key.value-object";
import { Branch as PrismaBranch, BranchExternalKey as PrismaBranchExternalKey, Prisma } from "@prisma/client";

export type PrismaBranchExtended = PrismaBranch & { externalKeys: PrismaBranchExternalKey[] };

export class BranchDomainMapper {
    static toPrisma(value: Branch): Prisma.BranchUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            cityId: value.cityId,
            companyId: value.companyId
        };
    }

    static toDomain(value: PrismaBranchExtended): Branch {
        return Branch.rehydrate({
            ...value,
            externalKeys: value.externalKeys.map(e => BranchExternalKey.create({ ...e }))
        });
    }
}