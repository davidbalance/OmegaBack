import { MedicalResultReport } from "@/medical/medical-result/types/medical-result-report.type";

const stubMedicalResultReport = (): MedicalResultReport => ({
    company: "Company",
    branch: "Branch",
    management: "Management",
    area: "Area",
    year: 2000,
    process: "My process",
    date: new Date(),
    jobPosition: "Job position",
    dni: "1234567890",
    role: undefined,
    name: "Name",
    lastname: "Lastname",
    email: "Email",
    age: 20,
    birthday: new Date("2000-01-01"),
    gender: "male",
    exam: "Exam",
    examSubtype: "Subtype",
    examType: "Type",
    disease: "Disease",
    diseaseGroup: "Disease group",
    diseaseCommentary: "Commentary"
});

export const mockMedicalResultReportArray = () => [1, 2, 3, 4, 5].map(stubMedicalResultReport);