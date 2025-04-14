import { Inject } from "@nestjs/common";

export const AreaCreateCommandToken = 'AreaCreateCommand';
export const AreaEditCommandToken = 'AreaEditCommand';
export const AreaRemoveCommandToken = 'AreaRemoveCommand';

export const CorporativeCreateCommandToken = 'CorporativeCreateCommand';
export const CorporativeRemoveCommandToken = 'CorporativeRemoveCommand';
export const CorporativeCreateFromExternalSourceCommandToken = 'CorporativeCreateFromExternalSourceCommand';
export const CompanyMoveCommandToken = 'CompanyMoveCommand';
export const CompanyCreateCommandToken = 'CompanyCreateCommand';
export const CompanyRemoveCommandToken = 'CompanyRemoveCommand';
export const CompanyCreateFromExternalSourceCommandToken = 'CompanyCreateFromExternalSourceCommand';
export const BranchMoveCommandToken = 'BranchMoveCommand';
export const BranchCreateCommandToken = 'BranchCreateCommand';
export const BranchRemoveCommandToken = 'BranchRemoveCommand';
export const BranchCreateFromExternalSourceCommandToken = 'BranchCreateFromExternalSourceCommand';

export const JobPositionCreateCommandToken = 'JobPositionCreateCommand';
export const JobPositionEditCommandToken = 'JobPositionEditCommand';
export const JobPositionRemoveCommandToken = 'JobPositionRemoveCommand';

export const ManagementCreateCommandToken = 'ManagementCreateCommand';
export const ManagementEditCommandToken = 'ManagementEditCommand';
export const ManagementRemoveCommandToken = 'ManagementRemoveCommand';

const command = {
    AreaCreate: AreaCreateCommandToken,
    AreaEdit: AreaEditCommandToken,
    AreaRemove: AreaRemoveCommandToken,

    CorporativeCreate: CorporativeCreateCommandToken,
    CorporativeRemove: CorporativeRemoveCommandToken,
    CorporativeCreateFromExternalSource: CorporativeCreateFromExternalSourceCommandToken,
    CompanyMove: CompanyMoveCommandToken,
    CompanyCreate: CompanyCreateCommandToken,
    CompanyRemove: CompanyRemoveCommandToken,
    CompanyCreateFromExternalSource: CompanyCreateFromExternalSourceCommandToken,
    BranchMove: BranchMoveCommandToken,
    BranchCreate: BranchCreateCommandToken,
    BranchRemove: BranchRemoveCommandToken,
    BranchCreateFromExternalSource: BranchCreateFromExternalSourceCommandToken,

    JobPositionCreate: JobPositionCreateCommandToken,
    JobPositionEdit: JobPositionEditCommandToken,
    JobPositionRemove: JobPositionRemoveCommandToken,

    ManagementCreate: ManagementCreateCommandToken,
    ManagementEdit: ManagementEditCommandToken,
    ManagementRemove: ManagementRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);