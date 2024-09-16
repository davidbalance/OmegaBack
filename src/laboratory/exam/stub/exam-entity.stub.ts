import { ExamExternalKeyEntity } from "@/laboratory/exam/entities/exam-external-key.entity";
import { ExamEntity } from "@/laboratory/exam/entities/exam.entity";

const stubExamEntity = (id: number): ExamEntity => ({
    id: id,
    name: "my-stub-name",
    externalKey: {} as ExamExternalKeyEntity,
    subtype: { id: 1 } as any,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamEntity = () => stubExamEntity(1);
export const mockExamEntities = () => [1, 2, 3, 4, 5].map(stubExamEntity);