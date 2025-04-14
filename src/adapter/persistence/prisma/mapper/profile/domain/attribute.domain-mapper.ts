import { Attribute } from "@omega/profile/core/domain/user/attribute.domain";
import { Attribute as PrismaAttribute, Prisma } from "@prisma/client";

export class AttributeDomainMapper {
    static toPrisma(value: Attribute): Prisma.AttributeUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            value: value.value,
            userId: value.userId
        }
    }

    static toDomain(value: PrismaAttribute): Attribute {
        return Attribute.rehydrate({ ...value });
    }
}