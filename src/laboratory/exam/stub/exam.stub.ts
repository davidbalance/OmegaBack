import { Exam } from "../dtos/response/exam.base.dto";

const stubExam = (id: number): Exam => ({
    id: id,
    name: "Stub name",
    subtype: 1
});

export const mockExam = () => stubExam(1);
export const mockExams = () => [1, 2, 3, 4, 5].map(stubExam);