import { ExamTypeEntity } from "../entities/exam-type.entity";
import { ExamTypeExternalKeyEntity } from "../entities/exam-type-external-key.entity";

export const stubExamType = (id: number): ExamTypeEntity => ({
    id: id,
    name: "",
    status: false,
    externalKey: {} as ExamTypeExternalKeyEntity,
    subtypes: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamTypeEntity = () => stubExamType(1);
export const mockExamTypeEntities = () => Array(20).map(stubExamType);