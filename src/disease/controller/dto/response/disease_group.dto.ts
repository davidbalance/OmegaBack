import { DiseaseGroupOption } from '@omega/disease/core/model/disease/disease-group-option.model';
import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination_response';
import { Expose, Type } from 'class-transformer'

export class DiseaseGroupResponseDto {
    @Expose() public readonly groupId: string;
    @Expose() public readonly groupName: string;
    @Expose() public readonly hasDiseases: boolean;
}

export class DiseaseGroupManyResponseDto implements PaginationResponse<DiseaseGroupResponseDto> {
    @Type(() => DiseaseGroupResponseDto)
    @Expose() public readonly data: DiseaseGroupResponseDto[];
    @Expose() public readonly amount: number;
}

class DiseaseOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}
export class DiseaseGroupOptionResponseDto implements DiseaseGroupOption {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;

    @Type(() => DiseaseOptionResponseDto)
    @Expose() public readonly children: DiseaseOptionResponseDto[]
}