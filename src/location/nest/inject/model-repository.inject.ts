import { Inject } from "@nestjs/common";

export const AreaModelRepositoryToken = 'AreaModelRepository';
export const AreaOptionModelRepositoryToken = 'AreaOptionModelRepository';

export const CorporativeOptionModelRepositoryToken = 'CorporativeOptionModelRepository';
export const CorporativeModelRepositoryToken = 'CorporativeModelRepository';
export const CorporativeExternalConnectionModelRepositoryToken = 'CorporativeExternalConnectionModelRepository';
export const CompanyOptionModelRepositoryToken = 'CompanyOptionModelRepository';
export const CompanyModelRepositoryToken = 'CompanyModelRepository';
export const CompanyExternalConnectionModelRepositoryToken = 'CompanyExternalConnectionModelRepository';
export const BranchModelRepositoryToken = 'BranchModelRepository';
export const BranchExternalConnectionModelRepositoryToken = 'BranchExternalConnectionModelRepository';

export const JobPositionModelRepositoryToken = 'JobPositionModelRepository';
export const JobPositionOptionModelRepositoryToken = 'JobPositionOptionModelRepository';

export const ManagementModelRepositoryToken = 'ManagementModelRepository';
export const ManagementOptionModelRepositoryToken = 'ManagementOptionModelRepository';

const repository = {
    Area: AreaModelRepositoryToken,
    AreaOption: AreaOptionModelRepositoryToken,

    CorporativeOption: CorporativeOptionModelRepositoryToken,
    Corporative: CorporativeModelRepositoryToken,
    CorporativeExternalConnection: CorporativeExternalConnectionModelRepositoryToken,
    CompanyOption: CompanyOptionModelRepositoryToken,
    Company: CompanyModelRepositoryToken,
    CompanyExternalConnection: CompanyExternalConnectionModelRepositoryToken,
    Branch: BranchModelRepositoryToken,
    BranchExternalConnection: BranchExternalConnectionModelRepositoryToken,

    JobPosition: JobPositionModelRepositoryToken,
    JobPositionOption: JobPositionOptionModelRepositoryToken,

    Management: ManagementModelRepositoryToken,
    ManagementOption: ManagementOptionModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);