import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { DiseaseGroupSingleResponseDto } from "./base.disease-group-single.response.dto";

export class GetDiseaseGroupSingleArrayResponseDto implements ObjectArrayResponse<DiseaseGroupSingleResponseDto> {
    @Expose()
    @Type(() => DiseaseGroupSingleResponseDto)
    public readonly data: DiseaseGroupSingleResponseDto[];
}