import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class UserAttributeResponseDto {
    @Expose() public readonly attributeId: string;
    @Expose() public readonly attributeName: string;
    @Expose() public readonly attributeValue: string;
    @Expose() public readonly userId: string;
}

export class CompanyFilterResponseDto {
    @Expose() public readonly id: string;
    @Expose() public readonly companyId: string;
    @Expose() public readonly companyRuc: string;
    @Expose() public readonly corporativeId: string;
    @Expose() public readonly corporativeName: string;
    @Expose() public readonly userId: string;
}

export class CorporativeFilterResponseDto {
    @Expose() public readonly id: string;
    @Expose() public readonly corporativeId: string;
    @Expose() public readonly corporativeName: string;
    @Expose() public readonly userId: string;
}

export class CompanyFilterFindManyResponseDto implements PaginationResponse<CompanyFilterResponseDto> {
    @Type(() => CompanyFilterResponseDto)
    @Expose() public readonly data: CompanyFilterResponseDto[];
    @Expose() public readonly amount: number;
}

export class CorporativeFilterFindManyResponseDto implements PaginationResponse<CorporativeFilterResponseDto> {
    @Type(() => CorporativeFilterResponseDto)
    @Expose() public readonly data: CorporativeFilterResponseDto[];
    @Expose() public readonly amount: number;
}
