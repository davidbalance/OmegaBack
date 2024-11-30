import { Checklist } from "../dto/response/checklist.base.dto";

const stubChecklist = (id: number): Checklist => ({
    clientDni: "1234567890",
    clientName: "Stub name",
    clientLastname: "Stub lastname",
    jobPosition: "Test jobposition",
    process: "Post-Ocupacional",
    companyRuc: "1234567890001",
    companyName: "Stub company",
    createAt: new Date(),
    exams: [{
        id: 1,
        examName: 'Test exam',
        checklistStatus: true
    }]
});

export const mockChecklist = () => stubChecklist(1);
export const mockChecklists = () => Array(10).map(stubChecklist);