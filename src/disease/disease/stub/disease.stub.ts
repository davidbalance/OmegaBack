import { Disease } from "../dtos/response/disease.base.dto";

const stubDisease = (id: number): Disease => ({
    id: id,
    name: "Stub disease",
    group: 1
});

export const mockDisease = () => stubDisease(1);
export const mockDiseases = () => [1, 2, 3, 4, 5].map(stubDisease);