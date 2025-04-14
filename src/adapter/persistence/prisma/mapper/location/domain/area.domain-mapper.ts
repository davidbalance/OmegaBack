import { Area } from "@omega/location/core/domain/area/area.domain";
import { Area as PrismaArea, Prisma } from "@prisma/client";

export class AreaDomainMapper {
    static toPrisma(value: Area): Prisma.AreaUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaArea): Area {
        return Area.rehydrate({ ...value });
    }
}