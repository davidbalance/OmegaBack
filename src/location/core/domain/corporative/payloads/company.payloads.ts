import { CreateBranchPayload } from "./branch.payloads";

export type CreateCompanyPayload = {
    name: string;
    ruc: string;
    address: string;
    phone: string;
    corporativeId: string;
}

export type AddBranchToCompanyPayload = Omit<CreateBranchPayload, 'companyId'>;