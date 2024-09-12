import { ExtendedExam } from "../dtos/response/extended-exam.base.dto";

const stubExtendedExam = (id: number): ExtendedExam => ({
    id: id,
    name: "Stub exam"
});

export const mockExtendedExam = () => stubExtendedExam(1);
export const mockExtendedExams = () => Array(10).map(stubExtendedExam);