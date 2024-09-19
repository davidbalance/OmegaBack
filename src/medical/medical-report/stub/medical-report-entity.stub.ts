import { MedicalReportEntity } from "../entities/medical-report.entity";

const stubMedicalReportEntity = (id: number): MedicalReportEntity => ({
    id: id,
    fileAddress: "Stub address",
    content: "Stub content",
    hasFile: true,
    order: 1,
    patientDni: "1234567890",
    patientFullname: "Stub fullname",
    patientBirthday: new Date(),
    examName: "Stub exam",
    companyName: "Stub company",
    doctorDni: "1234567891",
    doctorFullname: "Stub doctor",
    doctorSignature: "Stub signature",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalReportEntity = () => stubMedicalReportEntity(1);
export const mockMedicalReportEntities = () => Array(10).map(stubMedicalReportEntity);