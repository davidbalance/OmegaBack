import { mockDiseaseGroup } from "@/disease/disease-group/services/test/stub/disease-group.stub";
import { Disease } from "@/disease/disease/entities/disease.entity";

const stubDisease = (id: number): Disease => ({
    id: id,
    name: "my-stub-name",
    status: true,
    group: mockDiseaseGroup(),
    createAt: new Date(),
    updateAt: new Date()
});

export const mockDisease = () => stubDisease(1);
export const mockDiseases = () => [1, 2, 3, 4, 5].map(stubDisease);