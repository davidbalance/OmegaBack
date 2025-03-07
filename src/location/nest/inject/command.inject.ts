import { Inject } from "@nestjs/common";

export const AreaCreateCommandToken = 'AreaCreateCommand';
export const AreaEditCommandToken = 'AreaEditCommand';
export const AreaRemoveCommandToken = 'AreaRemoveCommand';
export const BranchMoveCommandToken = 'BranchMoveCommand';
export const BranchCreateCommandToken = 'BranchCreateCommand';
export const BranchRemoveCommandToken = 'BranchRemoveCommand';
export const CompanyMoveCommandToken = 'CompanyMoveCommand';
export const CompanyCreateCommandToken = 'CompanyCreateCommand';
export const CompanyRemoveCommandToken = 'CompanyRemoveCommand';
export const CorporativeCreateCommandToken = 'CorporativeCreateCommand';
export const CorporativeRemoveCommandToken = 'CorporativeRemoveCommand';
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
    BranchMove: BranchMoveCommandToken,
    BranchCreate: BranchCreateCommandToken,
    BranchRemove: BranchRemoveCommandToken,
    CompanyMove: CompanyMoveCommandToken,
    CompanyCreate: CompanyCreateCommandToken,
    CompanyRemove: CompanyRemoveCommandToken,
    CorporativeCreate: CorporativeCreateCommandToken,
    CorporativeRemove: CorporativeRemoveCommandToken,
    JobPositionCreate: JobPositionCreateCommandToken,
    JobPositionEdit: JobPositionEditCommandToken,
    JobPositionRemove: JobPositionRemoveCommandToken,
    ManagementCreate: ManagementCreateCommandToken,
    ManagementEdit: ManagementEditCommandToken,
    ManagementRemove: ManagementRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);