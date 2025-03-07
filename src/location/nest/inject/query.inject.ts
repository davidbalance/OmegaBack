import { Inject } from "@nestjs/common";

export const AreaFindManyQueryToken = 'AreaFindManyQuery';
export const AreaFindOneQueryToken = 'AreaFindOneQuery';
export const AreaFindOptionsQueryToken = 'AreaFindOptionsQuery';
export const BranchFindManyQueryToken = 'BranchFindManyQuery';
export const CompanyFindManyQueryToken = 'CompanyFindManyQuery';
export const CorporativeFindManyQueryToken = 'CorporativeFindManyQuery';
export const CorporativeFindOptionsQueryToken = 'CorporativeFindOptionsQuery';
export const JobPositionFindManyQueryToken = 'JobPositionFindManyQuery';
export const JobPositionFindOneQueryToken = 'JobPositionFindOneQuery';
export const JobPositionFindOptionsQueryToken = 'JobPositionFindOptionsQuery';
export const ManagementFindManyQueryToken = 'ManagementFindManyQuery';
export const ManagementFindOneByNameQueryToken = 'ManagementFindOneByNameQuery';
export const ManagementFindOneQueryToken = 'ManagementFindOneQuery';
export const ManagementFindOptionsQueryToken = 'ManagementFindOptionsQuery';

const query = {
    AreaFindMany: AreaFindManyQueryToken,
    AreaFindOne: AreaFindOneQueryToken,
    AreaFindOptions: AreaFindOptionsQueryToken,
    BranchFindMany: BranchFindManyQueryToken,
    CompanyFindMany: CompanyFindManyQueryToken,
    CorporativeFindMany: CorporativeFindManyQueryToken,
    CorporativeFindOptions: CorporativeFindOptionsQueryToken,
    JobPositionFindMany: JobPositionFindManyQueryToken,
    JobPositionFindOne: JobPositionFindOneQueryToken,
    JobPositionFindOptions: JobPositionFindOptionsQueryToken,
    ManagementFindMany: ManagementFindManyQueryToken,
    ManagementFindOneByName: ManagementFindOneByNameQueryToken,
    ManagementFindOne: ManagementFindOneQueryToken,
    ManagementFindOptions: ManagementFindOptionsQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);