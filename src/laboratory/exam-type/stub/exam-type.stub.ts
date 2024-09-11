import { ExamType } from "../dtos/response/exam-type.base.dto";

export const stubExamType = (id: number): ExamType => ({
    id: id,
    name: "my-stub-name"
});

export const mockExamType = () => stubExamType(1);
export const mockExamTypes = () => Array(20).map(stubExamType);