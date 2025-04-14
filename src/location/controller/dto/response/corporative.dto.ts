import { ApiProperty } from '@nestjs/swagger';
import { CompanyOption } from '@omega/location/core/models/corporative/company-option.model';
import { CorporativeOption } from '@omega/location/core/models/corporative/corporative-option.model';
import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination_response';
import { Expose, Type } from 'class-transformer'

export class CorporativeResponseDto {
    @Expose() public readonly corporativeId: string;
    @Expose() public readonly corporativeName: string;
    @Expose() public readonly hasCompanies: boolean;
}

export class CorporativeManyResponseDto implements PaginationResponse<CorporativeResponseDto> {
    @Type(() => CorporativeResponseDto)
    @Expose() public readonly data: CorporativeResponseDto[];
    @Expose() public readonly amount: number;
}

class BranchOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}

class CompanyOptionResponseDto implements CompanyOption {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;

    @Type(() => BranchOptionResponseDto)
    @Expose() public readonly children: BranchOptionResponseDto[];
}

export class CorporativeOptionResponseDto implements CorporativeOption {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;

    @Type(() => CompanyOptionResponseDto)
    @Expose() public readonly children: CompanyOption[];
}