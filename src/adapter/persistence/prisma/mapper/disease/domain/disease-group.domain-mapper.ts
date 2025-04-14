import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { Prisma, DiseaseGroup as PrismaDiseaseGroup, Disease as PrismaDisease } from "@prisma/client";
import { DiseaseDomainMapper } from "./disease.domain-mapper";

export type PrismaDiseaseGroupWithDiseases = PrismaDiseaseGroup & { diseases: PrismaDisease[] }

export class DiseaseGroupDomainMapper {
    static toPrisma(value: DiseaseGroup): Prisma.DiseaseGroupUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaDiseaseGroupWithDiseases): DiseaseGroup {
        return DiseaseGroup.rehydrate({
            ...value,
            diseases: value.diseases.map(e => DiseaseDomainMapper.toDomain(e))
        });
    }
}