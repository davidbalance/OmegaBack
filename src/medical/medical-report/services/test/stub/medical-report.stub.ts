import { MedicalReport } from "@/medical/medical-report/entities/medical-report.entity";

const stubMedicalReport = (id: number): MedicalReport => ({
    id: id,
    fileAddress: "/path/to/file",
    content: "My content",
    hasFile: true,
    order: 1,
    patientDni: "1234567890",
    patientFullname: "Name Fullname",
    patientBirthday: new Date('2000/01/01'),
    examName: "Exam",
    companyName: "Company",
    doctorDni: "1234567891",
    doctorFullname: "Doctor",
    doctorSignature: "signatures/0000000000/0000000000.png",
    sendAttributes: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalReport = () => stubMedicalReport(1);
export const mockMedicalReportArray = () => [1, 2, 3, 4, 5].map(stubMedicalReport);