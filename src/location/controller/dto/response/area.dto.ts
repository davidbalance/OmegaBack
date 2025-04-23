import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class AreaResponseDto {
    @Expose() public readonly areaId: string;
    @Expose() public readonly areaName: string;
}

export class AreaManyResponseDto implements PaginationResponse<AreaResponseDto> {
    @Type(() => AreaResponseDto)
    @Expose() public readonly data: AreaResponseDto[];
    @Expose() public readonly amount: number;
}

export class AreaOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}