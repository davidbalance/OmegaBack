import { ExamSubtypeOption } from '@omega/laboratory/core/model/exam/exam-subtype-option.model';
import { ExamTypeOption } from '@omega/laboratory/core/model/exam/exam-type-option.model';
import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class ExamTypeResponseDto {
    @Expose() public readonly typeId: string;
    @Expose() public readonly typeName: string;
    @Expose() public readonly hasSubtypes: boolean;
}

export class ExamTypeManyResponseDto implements PaginationResponse<ExamTypeResponseDto> {
    @Type(() => ExamTypeResponseDto)
    @Expose() public readonly data: ExamTypeResponseDto[];
    @Expose() public readonly amount: number;
}

class ExamResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}

class ExamSubtypeResponseDto implements ExamSubtypeOption {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;

    @Type(() => ExamResponseDto)
    @Expose() public readonly children: ExamResponseDto[];
}

export class ExamTypeOptionResponseDto implements ExamTypeOption {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;

    @Type(() => ExamSubtypeResponseDto)
    @Expose() public readonly children: ExamSubtypeResponseDto[];
}