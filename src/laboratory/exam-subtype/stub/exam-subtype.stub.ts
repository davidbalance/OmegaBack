import { ExamSubtype } from "../dtos/response/exam-subtype.base.dto";

export const stubExamSubtype = (id: number): ExamSubtype => ({
    id: id,
    name: "my-stub-name",
    type: 0
});

export const mockExamSubtype = () => stubExamSubtype(1);
export const mockExamSubtypes = () => [1, 2, 3, 4, 5].map(stubExamSubtype);