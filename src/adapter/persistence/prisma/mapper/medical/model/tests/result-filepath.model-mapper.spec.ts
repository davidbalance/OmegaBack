import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { ResultFilepathModel as PrismaResultFilepathModel } from "@prisma/client";
import { ResultFilepathModelMapper } from "../result-filepath.model-mapper";

describe('ResultFilepathModelMapper', () => {
    it('should correctly map a PrismaResultFilepathModel to an ResultFilepathModel instance', () => {
        const prismaValue: PrismaResultFilepathModel = {
            testId: "test-123",
            orderYear: 2025,
            locationCorporative: "Corporative",
            locationCompany: "Company",
            locationBranch: "Branch",
            patient: "Patient",
            order: "Post-Ocupacional",
            exam: "Exam"
        };

        const expectedValue = new ResultFilepathModel({ ...prismaValue });
        const result = ResultFilepathModelMapper.toModel(prismaValue);

        expect(result.testId).toBe(expectedValue.testId);
        expect(result.orderYear).toBe(expectedValue.orderYear);
        expect(result.locationCorporative).toBe(expectedValue.locationCorporative);
        expect(result.locationCompany).toBe(expectedValue.locationCompany);
        expect(result.locationBranch).toBe(expectedValue.locationBranch);
        expect(result.patient).toBe(expectedValue.patient);
        expect(result.order).toBe(expectedValue.order);
        expect(result.exam).toBe(expectedValue.exam);
    });
});