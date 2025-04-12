import { ExamExternalKey } from "@/laboratory/exam/entities/exam-external-key.entity";

const stubExamTypeExternalKey = (id: number): ExamExternalKey => ({
    id: id,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamTypeExternalKey = () => stubExamTypeExternalKey(1);
export const mockExamTypeExternalKeys = () => [1, 2, 3, 4, 5].map(stubExamTypeExternalKey);