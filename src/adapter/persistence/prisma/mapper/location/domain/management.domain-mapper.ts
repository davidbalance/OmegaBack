import { Management } from "@omega/location/core/domain/management/management.domain";
import { Management as PrismaManagement, Prisma } from "@prisma/client";

export class ManagementDomainMapper {
    static toPrisma(value: Management): Prisma.ManagementUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaManagement): Management {
        return Management.rehydrate({ ...value });
    }
}