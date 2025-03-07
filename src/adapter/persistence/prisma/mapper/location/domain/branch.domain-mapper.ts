import { Branch } from "@omega/location/core/domain/corporative/branch.domain";
import { Branch as PrismaBranch, Prisma } from "@prisma/client";

export class BranchDomainMapper {
    static toPrisma(value: Branch): Prisma.BranchUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            cityId: value.cityId,
            companyId: value.companyId
        };
    }

    static toDomain(value: PrismaBranch): Branch {
        return Branch.rehydrate({ ...value });
    }
}