import { Inject } from "@nestjs/common";

export const DoctorCreateCommandToken = 'DoctorCreateCommand';
export const DoctorUploadFileCommandToken = 'DoctorUploadFileCommand';
export const PatientCreateCommandToken = 'PatientCreateCommand';
export const UserAddAuthCommandToken = 'UserAddAuthCommand';
export const UserAddResourcesCommandToken = 'UserAddResourcesCommand';
export const UserAddAttributeCommandToken = 'UserAddAttributeCommand';
export const UserRemoveAttributeCommandToken = 'UserRemoveAttributeCommand';
export const UserCreateCommandToken = 'UserCreateCommand';
export const UserEditCommandToken = 'UserEditCommand';
export const UserEditByDniCommandToken = 'UserEditByDniCommand';
export const UserRemoveCommandToken = 'UserRemoveCommand';
export const AddCompanyFilterCommandToken = 'AddCompanyFilterCommand';
export const AddCorporativeFilterCommandToken = 'AddCorporativeFilterCommand';
export const RemoveCompanyFilterCommandToken = 'RemoveCompanyFilterCommand';
export const RemoveCorporativeFilterCommandToken = 'RemoveCorporativeFilterCommand';

const command = {
    DoctorCreate: DoctorCreateCommandToken,
    DoctorUploadFile: DoctorUploadFileCommandToken,
    PatientCreate: PatientCreateCommandToken,
    UserAddAuth: UserAddAuthCommandToken,
    UserAddResources: UserAddResourcesCommandToken,
    UserAddAttribute: UserAddAttributeCommandToken,
    UserRemoveAttribute: UserRemoveAttributeCommandToken,
    UserCreate: UserCreateCommandToken,
    UserEdit: UserEditCommandToken,
    UserEditByDni: UserEditByDniCommandToken,
    UserRemove: UserRemoveCommandToken,
    AddCompanyFilter: AddCompanyFilterCommandToken,
    AddCorporativeFilter: AddCorporativeFilterCommandToken,
    RemoveCompanyFilter: RemoveCompanyFilterCommandToken,
    RemoveCorporativeFilter: RemoveCorporativeFilterCommandToken
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);