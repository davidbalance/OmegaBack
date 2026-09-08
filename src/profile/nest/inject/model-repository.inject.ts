import { Inject } from "@nestjs/common";

export const DoctorOptionModelRepositoryToken = 'DoctorOptionModelRepository';
export const DoctorModelRepositoryToken = 'DoctorModelRepository';
export const UserAttributeModelRepositoryToken = 'UserAttributeModelRepository';
export const UserModelRepositoryToken = 'UserModelRepository';
export const CompanyFilterModelRepositoryToken = 'CompanyFilterModelRepository';
export const CorporativeFilterModelRepositoryToken = 'CorporativeFilterModelRepository';

const repository = {
    DoctorOption: DoctorOptionModelRepositoryToken,
    Doctor: DoctorModelRepositoryToken,
    UserAttribute: UserAttributeModelRepositoryToken,
    User: UserModelRepositoryToken,
    CompanyFilter: CompanyFilterModelRepositoryToken,
    CorporativeFilter: CorporativeFilterModelRepositoryToken
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);