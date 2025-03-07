import { PaginationResponse } from '@shared/shared/nest/pagination_response';
import { Expose, Type } from 'class-transformer'

export class DiseaseResponseDto {
    @Expose() public readonly diseaseId: string;
    @Expose() public readonly diseaseName: string;
    @Expose() public readonly groupId: string;
}

export class DiseaseManyResponseDto implements PaginationResponse<DiseaseResponseDto> {
    @Type(() => DiseaseResponseDto)
    @Expose() public readonly data: DiseaseResponseDto[];
    @Expose() public readonly amount: number;
}