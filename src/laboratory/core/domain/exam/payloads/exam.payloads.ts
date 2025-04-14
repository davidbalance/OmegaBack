import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CreateExamPayload = {
    name: string;
    subtypeId: string;
}

export type AddExamExternalKeyPayload = ExternalKeyProps;