import { DiseaseGroup } from "../dtos/response/disease-group.base.response.dto";

const stubGroup = (id: number): DiseaseGroup => ({
    id: id,
    name: "My-stub-group"
});

export const mockDiseaseGroup = () => stubGroup(1);
export const mockDiseaseGroups = () => [1, 2, 3, 4, 5].map(stubGroup);