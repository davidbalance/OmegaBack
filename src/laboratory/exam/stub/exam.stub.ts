import { ExamExternalKeyEntity } from "@/laboratory/exam/entities/exam-external-key.entity";
import { ExamEntity } from "@/laboratory/exam/entities/exam.entity";

const stubExam = (id: number): ExamEntity => ({
    id: id,
    name: "my-stub-name",
    externalKey: {} as ExamExternalKeyEntity,
    subtype: undefined,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExam = () => stubExam(1);
export const mockExams = () => [1, 2, 3, 4, 5].map(stubExam);