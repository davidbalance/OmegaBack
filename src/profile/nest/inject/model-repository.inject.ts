import { Inject } from "@nestjs/common";

export const DoctorOptionModelRepositoryToken = 'DoctorOptionModelRepository';
export const DoctorModelRepositoryToken = 'DoctorModelRepository';
export const UserAttributeModelRepositoryToken = 'UserAttributeModelRepository';
export const UserModelRepositoryToken = 'UserModelRepository';

const repository = {
    DoctorOption: DoctorOptionModelRepositoryToken,
    Doctor: DoctorModelRepositoryToken,
    UserAttribute: UserAttributeModelRepositoryToken,
    User: UserModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);