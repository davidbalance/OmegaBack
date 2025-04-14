import { DiseaseGroupOptionModel } from "@omega/disease/core/model/disease/disease-group-option.model";
import { DiseaseGroupOptionModel as PrismaDiseaseGroupOptionModel } from "@prisma/client";
import { DiseaseGroupOptionModelMapper } from "../disease-group-option.model-mapper";

describe('DiseaseGroupOptionModelMapper', () => {
    it('should correctly map a PrismaDiseaseGroupOptionModel to an DiseaseGroupOptionModel instance', () => {
        const prismaValue: PrismaDiseaseGroupOptionModel = {
            diseaseLabel: 'Infectious disease',
            diseaseValue: 'disease-123',
            groupLabel: "Infectious group",
            groupValue: 'group-123'
        };

        const expectedValue = new DiseaseGroupOptionModel({ ...prismaValue });
        const result = DiseaseGroupOptionModelMapper.toModel(prismaValue);
        expect(result.diseaseLabel).toBe(expectedValue.diseaseLabel);
        expect(result.diseaseValue).toBe(expectedValue.diseaseValue);
        expect(result.groupLabel).toBe(expectedValue.groupLabel);
        expect(result.groupValue).toBe(expectedValue.groupValue);
    });
});
