import { CorporativeFilter } from "@omega/profile/core/domain/user/corporative-filter.domain";
import { CorporativeFilter as PrismaCorporativeFilter, Prisma } from "@prisma/client";

export class CorporativeFilterDomainMapper {
    static toPrisma(value: CorporativeFilter): Prisma.CorporativeFilterUncheckedCreateInput {
        return {
            id: value.id,
            corporativeId: value.corporativeId,
            corporativeName: value.corporativeName,
            userId: value.userId,
        }
    }

    static toDomain(value: PrismaCorporativeFilter): CorporativeFilter {
        return CorporativeFilter.rehydrate({ ...value });
    }
}