import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

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

export type AddExamSubtypeExternalKeyPayload = ExternalKeyProps;

export type AddExternalKeyToExamPayload = ExternalKeyProps & {
    examId: string;
};