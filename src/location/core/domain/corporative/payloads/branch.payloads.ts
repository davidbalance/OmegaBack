import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CreateBranchPayload = {
    name: string;
    cityId: number;
    companyId: string;
}

export type AddBranchExternalKeyPayload = ExternalKeyProps;