import { ExamExternalKey } from "@/laboratory/exam/entities/exam-external-key.entity";

const stubExamSubtypeExternalKey = (id: number): ExamExternalKey => ({
    id: id,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamSubtypeExternalKey = () => stubExamSubtypeExternalKey(1);
export const mockExamSubtypeExternalKeys = () => [1, 2, 3, 4, 5].map(stubExamSubtypeExternalKey);