import { DiseaseGroupEntity } from "@/disease/disease-group/entities/disease-group.entity";

const stubGroup = (id: number): DiseaseGroupEntity => ({
    id: id,
    name: "My-stub-group",
    diseases: [],
    createAt: new Date(),
    updateAt: new Date(),
    status: true,
});

export const mockDiseaseGroup = () => stubGroup(1);
export const mockDiseaseGroups = () => [1, 2, 3, 4, 5].map(stubGroup);