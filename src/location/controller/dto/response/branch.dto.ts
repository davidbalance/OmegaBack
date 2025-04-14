import { Expose } from 'class-transformer'

export class BranchResponseDto {
    @Expose() public readonly branchId: string;
    @Expose() public readonly branchName: string;
    @Expose() public readonly companyId: string;
    @Expose() public readonly cityName: string;
}