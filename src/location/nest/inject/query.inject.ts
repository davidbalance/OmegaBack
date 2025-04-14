import { Inject } from "@nestjs/common";

export const AreaFindManyQueryToken = 'AreaFindManyQuery';
export const AreaFindOneQueryToken = 'AreaFindOneQuery';
export const AreaFindOptionsQueryToken = 'AreaFindOptionsQuery';

export const CorporativeFindManyQueryToken = 'CorporativeFindManyQuery';
export const CorporativeFindOptionsQueryToken = 'CorporativeFindOptionsQuery';
export const CorporativeFindOneByExternalKeyQueryToken = 'CorporativeFindOneByExternalKeyQuery';
export const CompanyFindManyQueryToken = 'CompanyFindManyQuery';
export const CompanyFindOneByExternalKeyQueryToken = 'CompanyFindOneByExternalKeyQuery';
export const BranchFindManyQueryToken = 'BranchFindManyQuery';
export const BranchFindOneByExternalKeyQueryToken = 'BranchFindOneByExternalKeyQuery';

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
    CorporativeFindMany: CorporativeFindManyQueryToken,
    CorporativeFindOptions: CorporativeFindOptionsQueryToken,
    CorporativeFindOneByExternalKey: CorporativeFindOneByExternalKeyQueryToken,
    CompanyFindMany: CompanyFindManyQueryToken,
    CompanyFindOneByExternalKey: CompanyFindOneByExternalKeyQueryToken,
    BranchFindMany: BranchFindManyQueryToken,
    BranchFindOneByExternalKey: BranchFindOneByExternalKeyQueryToken,
    JobPositionFindMany: JobPositionFindManyQueryToken,
    JobPositionFindOne: JobPositionFindOneQueryToken,
    JobPositionFindOptions: JobPositionFindOptionsQueryToken,
    ManagementFindMany: ManagementFindManyQueryToken,
    ManagementFindOneByName: ManagementFindOneByNameQueryToken,
    ManagementFindOne: ManagementFindOneQueryToken,
    ManagementFindOptions: ManagementFindOptionsQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);