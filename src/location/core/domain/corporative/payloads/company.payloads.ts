import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CreateBranchPayload } from "./branch.payloads";

export type CreateCompanyPayload = {
    name: string;
    ruc: string;
    address: string;
    phone: string;
    corporativeId: string;
}

export type AddBranchToCompanyPayload = Omit<CreateBranchPayload, 'companyId'>;

export type AddCompanyExternalKeyPayload = ExternalKeyProps;

export type AddBranchExternalKeyFromCompanyPayload = ExternalKeyProps & {
    branchId: string;
};