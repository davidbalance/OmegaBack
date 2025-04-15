import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { DiseaseReportModel as PrismaDiseaseReportModel } from "@prisma/client";
import { DiseaseReportModelMapper } from "../disease-report.model-mapper";

describe('DiseaseReportModelMapper', () => {
    it('should correctly map a PrismaDiseaseReportModel to an DiseaseReportModel instance', () => {
        const prismaValue: PrismaDiseaseReportModel = {
            diseaseReportId: 'id-123',
            testId: 'test-123',
            diseaseCommentary: 'Test commentary...',
            diseaseGroupId: 'group-123',
            diseaseGroupName: 'Group',
            diseaseId: 'disease-123',
            diseaseName: 'Disease',
        };

        const expectedValue = new DiseaseReportModel({ ...prismaValue });
        const result = DiseaseReportModelMapper.toModel(prismaValue);
        expect(result.diseaseReportId).toBe(expectedValue.diseaseReportId);
        expect(result.testId).toBe(expectedValue.testId);
        expect(result.diseaseCommentary).toBe(expectedValue.diseaseCommentary);
        expect(result.diseaseGroupId).toBe(expectedValue.diseaseGroupId);
        expect(result.diseaseGroupName).toBe(expectedValue.diseaseGroupName);
        expect(result.diseaseId).toBe(expectedValue.diseaseId);
        expect(result.diseaseName).toBe(expectedValue.diseaseName);
    });
});
