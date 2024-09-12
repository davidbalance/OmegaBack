import { ExamTypeEntity } from "@/laboratory/exam-type/entities/exam-type.entity";
import { ExamSubtypeEntity } from "../entities/exam-subtype.entity";
import { ExamSubtypeExternalKeyEntity } from "../entities/exam-subtype-external-key.entity";

export const stubExamSubtypeEntity = (id: number): ExamSubtypeEntity => ({
    id: id,
    name: "my-stub-name",
    status: false,
    type: {} as ExamTypeEntity,
    externalKey: {} as ExamSubtypeExternalKeyEntity,
    exams: [],
    createAt: undefined,
    updateAt: undefined
});

export const mockExamSubtypeEntity = () => stubExamSubtypeEntity(1);
export const mockExamSubtypeEntities = () => [1, 2, 3, 4, 5].map(stubExamSubtypeEntity);