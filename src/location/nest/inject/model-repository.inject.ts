import { Inject } from "@nestjs/common";

export const AreaModelRepositoryToken = 'AreaModelRepository';
export const AreaOptionModelRepositoryToken = 'AreaOptionModelRepository';
export const BranchModelRepositoryToken = 'BranchModelRepository';
export const CompanyOptionModelRepositoryToken = 'CompanyOptionModelRepository';
export const CompanyModelRepositoryToken = 'CompanyModelRepository';
export const CorporativeOptionModelRepositoryToken = 'CorporativeOptionModelRepository';
export const CorporativeModelRepositoryToken = 'CorporativeModelRepository';
export const JobPositionModelRepositoryToken = 'JobPositionModelRepository';
export const JobPositionOptionModelRepositoryToken = 'JobPositionOptionModelRepository';
export const ManagementModelRepositoryToken = 'ManagementModelRepository';
export const ManagementOptionModelRepositoryToken = 'ManagementOptionModelRepository';

const repository = {
    Area: AreaModelRepositoryToken,
    AreaOption: AreaOptionModelRepositoryToken,
    Branch: BranchModelRepositoryToken,
    CompanyOption: CompanyOptionModelRepositoryToken,
    Company: CompanyModelRepositoryToken,
    CorporativeOption: CorporativeOptionModelRepositoryToken,
    Corporative: CorporativeModelRepositoryToken,
    JobPosition: JobPositionModelRepositoryToken,
    JobPositionOption: JobPositionOptionModelRepositoryToken,
    Management: ManagementModelRepositoryToken,
    ManagementOption: ManagementOptionModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);