import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { DiseaseModel as PrismaDiseaseModel } from "@prisma/client";
import { DiseaseModelMapper } from "../disease.model-mapper";

describe('DiseaseModelMapper', () => {
    it('should correctly map a PrismaDiseaseModel to an DiseaseModel instance', () => {
        const prismaValue: PrismaDiseaseModel = {
            groupId: 'group-123',
            diseaseId: 'disease-123',
            diseaseName: 'Infectious Disease'
        };

        const expectedValue = new DiseaseModel({ ...prismaValue });
        const result = DiseaseModelMapper.toModel(prismaValue);
        expect(result.groupId).toBe(expectedValue.groupId);
        expect(result.diseaseId).toBe(expectedValue.diseaseId);
        expect(result.diseaseName).toBe(expectedValue.diseaseName);
    });
});
