import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination_response';
import { Expose, Type } from 'class-transformer'

export class ManagementResponseDto {
    @Expose() public readonly managementId: string;
    @Expose() public readonly managementName: string;
}

export class ManagementManyResponseDto implements PaginationResponse<ManagementResponseDto> {
    @Type(() => ManagementResponseDto)
    @Expose() public readonly data: ManagementResponseDto[];
    @Expose() public readonly amount: number;
}

export class ManagementOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}