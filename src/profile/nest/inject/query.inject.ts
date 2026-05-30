import { Inject } from "@nestjs/common";

export const DoctorFindManyQueryToken = 'DoctorFindManyQuery';
export const DoctorFindOneByDniQueryToken = 'DoctorFindOneByDniQuery';
export const DoctorFindOneQueryToken = 'DoctorFindOneQuery';
export const DoctorFindOptionsQueryToken = 'DoctorFindOptionsQuery';
export const DoctorGetFileQueryToken = 'DoctorGetFileQuery';
export const UserAttributeFindOneQueryToken = 'UserAttributeFindOneQuery';
export const UserFindManyQueryToken = 'UserFindManyQuery';
export const UserFindManyResourcesQueryToken = 'UserFindManyResourcesQuery';
export const UserFindOneQueryToken = 'UserFindOneQuery';
export const UserFindOneByAuthQueryToken = 'UserFindOneByAuthQuery';

const query = {
    DoctorFindMany: DoctorFindManyQueryToken,
    DoctorFindOneByDni: DoctorFindOneByDniQueryToken,
    DoctorFindOne: DoctorFindOneQueryToken,
    DoctorFindOptions: DoctorFindOptionsQueryToken,
    DoctorGetFile: DoctorGetFileQueryToken,
    UserAttributeFindOne: UserAttributeFindOneQueryToken,
    UserFindManyResources: UserFindManyResourcesQueryToken,
    UserFindMany: UserFindManyQueryToken,
    UserFindOne: UserFindOneQueryToken,
    UserFindOneByAuth: UserFindOneByAuthQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);