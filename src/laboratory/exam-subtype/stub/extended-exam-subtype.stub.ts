import { ExtendedExam } from "@/laboratory/exam/dtos/response/extended-exam.base.dto";
import { ExtendedExamSubtype } from "../dtos/response/extended-exam-subtype.base.dto";

const stubExam = (id: number): ExtendedExam => ({
    id: id,
    name: "Stub exam"
});

export const stubExamSubtype = (id: number): ExtendedExamSubtype => ({
    id: id,
    name: "my-stub-name",
    exams: Array(10).map(stubExam)
});

export const mockExtededExamSubtype = () => stubExamSubtype(1);
export const mockExtededExamSubtypes = () => Array(10).map(stubExamSubtype);