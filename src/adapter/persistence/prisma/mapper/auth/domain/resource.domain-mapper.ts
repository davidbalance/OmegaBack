import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { Resource as PrismaResource, Prisma } from "@prisma/client";

export class ResourceDomainMapper {
    static toPrisma(value: Resource): Prisma.ResourceUncheckedCreateInput {
        return {
            id: value.id,
            address: value.address,
            icon: value.icon,
            label: value.label,
            hidden: value.hidden,
            order: value.order
        };
    }

    static toDomain(value: PrismaResource): Resource {
        return Resource.rehydrate({ ...value });
    }
}