import { ExamExternalKey } from "@/laboratory/exam/entities/exam-external-key.entity";

const stubExamExternalKey = (id: number): ExamExternalKey => ({
    id: id,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamExternalKey = () => stubExamExternalKey(1);
export const mockExamExternalKeys = () => [1, 2, 3, 4, 5].map(stubExamExternalKey);