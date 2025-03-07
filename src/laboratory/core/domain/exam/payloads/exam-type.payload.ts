import { AddExamToSubtypePayload, RenameExamFromSubtypePayload } from "./exam-subtype.payload";

export type CreateExamTypePayload = {
    name: string;
}

export type AddSubtypeToTypePayload = {
    subtypeName: string
}

export type RenameSubtypeFromTypePayload = {
    subtypeId: string;
    subtypeName: string;
}

export type AddExamFromTypePayload = AddExamToSubtypePayload & {
    subtypeId: string;
}

export type RemoveExamFromTypePayload = {
    subtypeId: string;
    examId: string;
}

export type RenameExamFromTypePayload = RenameExamFromSubtypePayload & {
    subtypeId: string;
}

export type MoveExamPayload = {
    toSubtypeId: string;
    fromSubtypeId: string;
    examId: string;
}