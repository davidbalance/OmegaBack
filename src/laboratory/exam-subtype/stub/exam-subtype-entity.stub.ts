import { ExamTypeEntity } from "@/laboratory/exam-type/entities/exam-type.entity";
import { ExamSubtypeEntity } from "../entities/exam-subtype.entity";
import { ExamSubtypeExternalKeyEntity } from "../entities/exam-subtype-external-key.entity";

export const stubExamSubtype = (id: number): ExamSubtypeEntity => ({
    id: id,
    name: "my-stub-name",
    status: false,
    type: {} as ExamTypeEntity,
    externalKey: {} as ExamSubtypeExternalKeyEntity,
    exams: [],
    createAt: undefined,
    updateAt: undefined
});

export const mockExamSubtype = () => stubExamSubtype(1);
export const mockExamSubtypes = () => [1, 2, 3, 4, 5].map(stubExamSubtype);