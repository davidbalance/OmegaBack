import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { TestReportModel as PrismaTestReportModel } from "@prisma/client";
import { TestReportModelMapper } from "../test-report.model-mapper";

describe('TestReportModelMapper', () => {
    it('should correctly map a PrismaTestReportModel to an TestReportModel instance', () => {
        const prismaValue: PrismaTestReportModel = {
            testId: "test-123",
            diseaseReportId: "disease-report-123",
            orderYear: 2025,
            orderProcess: "Post-Ocupacional",
            orderDate: new Date(),
            locationCorporative: "Corporative",
            locationCompany: "Company",
            locationBranch: "Branch",
            locationManagement: null,
            locationArea: null,
            locationJobPosition: null,
            patientDni: "1234567890",
            patientName: "Patient",
            patientLastname: "Lastname",
            patientEmail: "test@email.com",
            patientBirthday: new Date(),
            patientAgeRange: "Youngster",
            patientAge: 10,
            patientRole: null,
            patientGender: "male",
            examName: "Exam",
            examSubtype: "Subtype",
            examType: "Type",
            diseaseName: "Disease",
            diseaseGroup: "Group",
            diseaseCommentary: "Testing Commentary",
            diseaseFindings: "Test finding..."
        };

        const expectedValue = new TestReportModel({ ...prismaValue });
        const result = TestReportModelMapper.toModel(prismaValue);
        expect(result.testId).toBe(expectedValue.testId);
        expect(result.diseaseReportId).toBe(expectedValue.diseaseReportId);
        expect(result.orderYear).toBe(expectedValue.orderYear);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
        expect(result.orderDate).toBe(expectedValue.orderDate);
        expect(result.locationCorporative).toBe(expectedValue.locationCorporative);
        expect(result.locationCompany).toBe(expectedValue.locationCompany);
        expect(result.locationBranch).toBe(expectedValue.locationBranch);
        expect(result.locationManagement).toBe(expectedValue.locationManagement);
        expect(result.locationArea).toBe(expectedValue.locationArea);
        expect(result.locationJobPosition).toBe(expectedValue.locationJobPosition);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.patientEmail).toBe(expectedValue.patientEmail);
        expect(result.patientBirthday).toBe(expectedValue.patientBirthday);
        expect(result.patientAgeRange).toBe(expectedValue.patientAgeRange);
        expect(result.patientAge).toBe(expectedValue.patientAge);
        expect(result.patientRole).toBe(expectedValue.patientRole);
        expect(result.patientGender).toBe(expectedValue.patientGender);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.examSubtype).toBe(expectedValue.examSubtype);
        expect(result.examType).toBe(expectedValue.examType);
        expect(result.diseaseName).toBe(expectedValue.diseaseName);
        expect(result.diseaseGroup).toBe(expectedValue.diseaseGroup);
        expect(result.diseaseCommentary).toBe(expectedValue.diseaseCommentary);
        expect(result.diseaseFindings).toBe(expectedValue.diseaseFindings);
    });
});