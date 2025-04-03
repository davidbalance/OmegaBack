import { Inject } from "@nestjs/common";

export const CreateBranchFromExternalSourceServiceToken = 'CreateBranchFromExternalSourceService';
export const CreateCompanyFromExternalSourceServiceToken = 'CreateCompanyFromExternalSourceService';
export const CreateCorporativeFromExternalSourceServiceToken = 'CreateCorporativeFromExternalSourceService';

const service = {
    CreateBranchFromExternalSource: CreateBranchFromExternalSourceServiceToken,
    CreateCompanyFromExternalSource: CreateCompanyFromExternalSourceServiceToken,
    CreateCorporativeFromExternalSource: CreateCorporativeFromExternalSourceServiceToken,
}

export const InjectService = (token: keyof typeof service) => Inject(service[token]);