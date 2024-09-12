import { ExamSubtype } from "../dtos/response/exam-subtype.base.dto";

export const stubExamSubtype = (id: number): ExamSubtype => ({
    id: id,
    name: "my-stub-name",
    type: 0
});

export const mockExamSubtype = () => stubExamSubtype(1);
export const mockExamSubtypes = () => Array(20).map(stubExamSubtype);