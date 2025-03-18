import { IncrementDomain } from "@local-increment/local-increment/domain/increment.domain";
import { Prisma, Increment as PrismaIncrement } from "@prisma/client";

export class IncrementDomainMapper {
    static toPrisma(value: IncrementDomain): Prisma.IncrementUncheckedCreateInput {
        return {
            id: value.id,
            key: value.key,
            count: value.count,
        };
    }

    static toDomain(value: PrismaIncrement): IncrementDomain {
        return IncrementDomain.rehydrate({
            ...value
        });
    }
}