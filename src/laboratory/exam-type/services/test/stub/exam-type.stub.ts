import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";

export const stubExamType = (id: number): ExamType => ({
    id: id,
    name: "my-stub-name",
    status: true,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockExamType = () => stubExamType(1);
export const mockExamTypes = () => [1, 2, 3, 4, 5].map(stubExamType);