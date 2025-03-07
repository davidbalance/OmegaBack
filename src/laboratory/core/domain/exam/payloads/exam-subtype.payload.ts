export type CreateExamSubtypePayload = {
    typeId: string;
    name: string;
}

export type AddExamToSubtypePayload = {
    examName: string;
}

export type RenameExamFromSubtypePayload = {
    examName: string;
    examId: string;
}