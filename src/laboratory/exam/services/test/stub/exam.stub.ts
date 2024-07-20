import { ExamExternalKey } from "@/laboratory/exam/entities/exam-external-key.entity";
import { Exam } from "@/laboratory/exam/entities/exam.entity";

const stubExam = (id: number): Exam => ({
    id: id,
    name: "my-stub-name",
    externalKey: {} as ExamExternalKey,
    subtype: undefined,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExam = () => stubExam(1);
export const mockExams = () => [1, 2, 3, 4, 5].map(stubExam);