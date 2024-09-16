import { ExtendedDiseaseGroup } from "../dtos/response/extended-disease-group.base.response.dto";

const stubExtendedDisease = (id:number) => ({
    id,
    name: 'Stub name'
});
const stubExtendedGroup = (id: number): ExtendedDiseaseGroup => ({
    id: id,
    name: "Stub name",
    diseases: Array(10).map(stubExtendedDisease)
});

export const mockExtendedDiseaseGroup = () => stubExtendedGroup(1);
export const mockExtendedDiseaseGroups = () => [1, 2, 3, 4, 5].map(stubExtendedGroup);