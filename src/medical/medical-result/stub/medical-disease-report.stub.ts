import { MedicalResultReport } from "../types/medical-result-report.type";

const stubMedicalDiseaseReport = (): MedicalResultReport => ({
    company: "Stub company",
    branch: "Stub branch",
    management: "Stub management",
    area: "Stub area",
    year: 2023,
    process: "Stub process",
    date: new Date(),
    jobPosition: "Stub position",
    dni: "1234567890",
    role: "Stub role",
    name: "Stub name",
    lastname: "Stub lastname",
    email: "test@email.com",
    age: 20,
    birthday: new Date(),
    gender: "male",
    exam: "Stub exam",
    examSubtype: "Stub exam subtype",
    examType: "Stub exam type",
    disease: "Stub disease",
    diseaseGroup: "Stub disease group",
    diseaseCommentary: "Stub disease commentary"
});

const mockMedicalDiseaseReport = () => stubMedicalDiseaseReport();
const mockMedicalDiseaseReports = () => Array(10).map(stubMedicalDiseaseReport);