import { Expose } from 'class-transformer'

export class BranchExternalResponseDto {
    @Expose() public readonly branchId: string;
    @Expose() public readonly branchExternalKey: string;
    @Expose() public readonly branchExternalOwner: string;
    @Expose() public readonly companyId: string;
}