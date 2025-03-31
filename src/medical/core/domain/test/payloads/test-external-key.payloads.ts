import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CreateTestExternalKeyPayload = ExternalKeyProps & {
    testId: string;
};