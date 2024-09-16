import { DiseaseGroupEntity } from "@/disease/disease-group/entities/disease-group.entity";
import { DiseaseEntity } from "@/disease/disease/entities/disease.entity";

const stubDiseaseEntity = (id: number): DiseaseEntity => ({
    id: id,
    name: "my-stub-name",
    status: true,
    group: {} as DiseaseGroupEntity,
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockDiseaseEntity = () => stubDiseaseEntity(1);
export const mockDiseaseEntities = () => [1, 2, 3, 4, 5].map(stubDiseaseEntity);