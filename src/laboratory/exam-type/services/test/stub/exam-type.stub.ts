import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";

export const stubExamType = (id: number): ExamType => ({
    id: id,
    name: "my-stub-name",
    status: true,
    subtypes: [],
    createAt: new Date(),
    updateAt: new Date(),
    externalKey: undefined
});

export const mockExamType = () => stubExamType(1);
export const mockExamTypes = () => [1, 2, 3, 4, 5].map(stubExamType);