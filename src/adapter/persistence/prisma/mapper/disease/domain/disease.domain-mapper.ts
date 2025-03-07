import { Disease } from "@omega/disease/core/domain/disease.domain";
import { Prisma, Disease as PrismaDisease } from "@prisma/client";

export class DiseaseDomainMapper {
    static toPrisma(value: Disease): Prisma.DiseaseUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            groupId: value.groupId
        };
    }

    static toDomain(value: PrismaDisease): Disease {
        return Disease.rehydrate({ ...value });
    }
}