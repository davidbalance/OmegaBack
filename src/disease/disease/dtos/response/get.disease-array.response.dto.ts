import { Expose, Type } from "class-transformer";
import { DiseaseResponseDto } from "./disease.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetDiseaseArrayResponseDto implements ObjectArrayResponse<DiseaseResponseDto> {
    @Expose()
    @Type(() => DiseaseResponseDto)
    public readonly data: DiseaseResponseDto[];
}