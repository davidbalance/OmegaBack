import { Expose } from 'class-transformer'

export class CompanyExternalResponseDto {
    @Expose() public readonly companyId: string;
    @Expose() public readonly companyExternalKey: string;
    @Expose() public readonly companyExternalOwner: string;
    @Expose() public readonly corporativeId: string;
}