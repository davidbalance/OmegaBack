import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class CompanyResponseDto {
    @Expose() public readonly corporativeId: string;
    @Expose() public readonly companyId: string;
    @Expose() public readonly companyRuc: string;
    @Expose() public readonly companyName: string;
    @Expose() public readonly companyAddress: string;
    @Expose() public readonly hasBranches: boolean;
    @Expose() public readonly companyPhone: string;
}

export class CompanyManyResponseDto implements PaginationResponse<CompanyResponseDto> {
    @Type(() => CompanyResponseDto)
    @Expose() public readonly data: CompanyResponseDto[];
    @Expose() public readonly amount: number;
}