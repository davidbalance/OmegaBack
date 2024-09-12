import { ExtendedExamSubtype } from "@/laboratory/exam-subtype/dtos/response/extended-exam-subtype.base.dto";
import { ExtendedExamType } from "../dtos/response/extended-exam-type.base.dto";
import { ExtendedExam } from "@/laboratory/exam/dtos/response/extended-exam.base.dto";

const stubExtendedExam = (id: number): ExtendedExam => ({
    id: id,
    name: "Stub exam"
});

const stubExtendedExamSubtype = (id: number): ExtendedExamSubtype => ({
    id: 0,
    name: "Stub subtype",
    exams: Array(10).map(stubExtendedExam),
});

export const stubExtendedExamType = (id: number): ExtendedExamType => ({
    id: id,
    name: "Stub type",
    subtypes: Array(10).map(stubExtendedExamSubtype)
});

export const mockExtendedExamType = () => stubExtendedExamType(1);
export const mockExtendedExamTypes = () => Array(20).map(stubExtendedExamType);