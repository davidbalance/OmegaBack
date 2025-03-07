import { PaginationResponse } from '@shared/shared/nest/pagination_response';
import { Expose, Type } from 'class-transformer'

export class ExamSubtypeResponseDto {
    @Expose() public readonly subtypeId: string;
    @Expose() public readonly subtypeName: string;
    @Expose() public readonly hasExams: boolean;
}

export class ExamSubtypeManyResponseDto implements PaginationResponse<ExamSubtypeResponseDto> {
    @Type(() => ExamSubtypeResponseDto)
    @Expose() public readonly data: ExamSubtypeResponseDto[];
    @Expose() public readonly amount: number;
}