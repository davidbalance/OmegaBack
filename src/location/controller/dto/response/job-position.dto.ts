import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class JobPositionResponseDto {
    @Expose() public readonly jobPositionId: string;
    @Expose() public readonly jobPositionName: string;
}

export class JobPositionManyResponseDto implements PaginationResponse<JobPositionResponseDto> {
    @Type(() => JobPositionResponseDto)
    @Expose() public readonly data: JobPositionResponseDto[];
    @Expose() public readonly amount: number;

}

export class JobPositionOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}