import { DiseaseGroupEntity } from "@/disease/disease-group/entities/disease-group.entity";

const stubGroupEntity = (id: number): DiseaseGroupEntity => ({
    id: id,
    name: "My-stub-group",
    diseases: [],
    createAt: new Date(),
    updateAt: new Date(),
    status: true,
});

export const mockDiseaseGroupEntity = () => stubGroupEntity(1);
export const mockDiseaseGroupEntities = () => [1, 2, 3, 4, 5].map(stubGroupEntity);