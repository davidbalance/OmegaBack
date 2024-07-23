import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";

export const stubExamsSubtype = (id: number): ExamSubtype => ({
    id: id,
    name: "my-stub-name",
    exams: undefined,
    status: true,
    type: undefined,
    createAt: new Date(),
    updateAt: new Date(),
    externalKey: undefined
});

export const mockExamsSubtype = () => stubExamsSubtype(1);
export const mockExamsSubtypes = () => [1, 2, 3, 4, 5].map(stubExamsSubtype);