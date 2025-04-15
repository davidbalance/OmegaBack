import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportModel as PrismaReportModel } from "@prisma/client";
import { ReportModelMapper } from "../report.model-mapper";

describe('ReportModelMapper', () => {
    it('should correctly map a PrismaReportModel to an ReportModel instance', () => {
        const prismaValue: PrismaReportModel = {
            testId: "test-123",
            reportContent: 'Testing content...',
            reportFilepath: '/path/to/file',
            reportEmissionDate: new Date(),
            patientFullname: "Patient Fullname",
            patientAge: 20,
            patientDni: "1234567890",
            locationCompanyName: "Company",
            examName: "Exam",
            doctorDni: "1234567890",
            doctorFullname: "Doctor Fullname",
            doctorSignature: "Doctor signature"
        };

        const expectedValue = new ReportModel({ ...prismaValue });
        const result = ReportModelMapper.toModel(prismaValue);

        expect(result.testId).toBe(expectedValue.testId);
        expect(result.reportContent).toBe(expectedValue.reportContent);
        expect(result.reportFilepath).toBe(expectedValue.reportFilepath);
        expect(result.reportEmissionDate).toBe(expectedValue.reportEmissionDate);
        expect(result.patientFullname).toBe(expectedValue.patientFullname);
        expect(result.patientAge).toBe(expectedValue.patientAge);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.locationCompanyName).toBe(expectedValue.locationCompanyName);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.doctorDni).toBe(expectedValue.doctorDni);
        expect(result.doctorFullname).toBe(expectedValue.doctorFullname);
        expect(result.doctorSignature).toBe(expectedValue.doctorSignature);
    });
});