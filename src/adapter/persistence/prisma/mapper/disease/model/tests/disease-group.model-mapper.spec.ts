import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupModel as PrismaDiseaseGroupModel } from "@prisma/client";
import { DiseaseGroupModelMapper } from "../disease-group.model-mapper";

describe('DiseaseGroupModelMapper', () => {
    it('should correctly map a PrismaDiseaseGroupModel to an DiseaseGroupModel instance', () => {
        const prismaValue: PrismaDiseaseGroupModel = {
            groupId: 'key-123',
            groupName: 'Infectious group',
            hasDiseases: true
        };

        const expectedValue = new DiseaseGroupModel({ ...prismaValue });
        const result = DiseaseGroupModelMapper.toModel(prismaValue);
        expect(result.groupId).toBe(expectedValue.groupId);
        expect(result.groupName).toBe(expectedValue.groupName);
        expect(result.hasDiseases).toBe(expectedValue.hasDiseases);
    });
});
