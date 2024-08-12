import { MedicalResult } from "@/medical/medical-result/entities/medical-result.entity";

const stubMedicalResult = (id: number): MedicalResult => ({
    id: id,
    hasFile: true,
    examType: "Exam type",
    examSubtype: "Exam subtype",
    examName: "Exam",
    doctorDni: "1234567890",
    doctorFullname: "Name Lastname",
    doctorSignature: "/path/to/signature",
    order: undefined,
    report: undefined,
    externalKey: undefined,
    sendAttributes: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalResult = () => stubMedicalResult(1);
export const mockMedicalResultArray = () => [1, 2, 3, 4, 5].map(stubMedicalResult);