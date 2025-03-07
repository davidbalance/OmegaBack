import { AddBranchToCompanyPayload, CreateCompanyPayload } from "./company.payloads";

export type CreateCorporativePayload = {
    name: string;
}

export type AddCompanyToCorporativePayload = Omit<CreateCompanyPayload, 'corporativeId'>;

export type AddBranchToCorporativePayload = AddBranchToCompanyPayload & {
    companyId: string;
}

export type RemoveBranchFromCorporativePayload = {
    companyId: string;
    branchId: string;
}

export type MoveBranchPayload = {
    fromCompanyId: string;
    toCompanyId: string;
    branchId: string;
}