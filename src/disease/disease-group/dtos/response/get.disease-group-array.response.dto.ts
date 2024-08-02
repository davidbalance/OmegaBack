import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { GetDiseaseGroupResponseDto } from "./get.disease-group.response.dto";
import { Expose, Type } from "class-transformer";

export class GetDiseaseGroupArrayResponseDto implements ObjectArrayResponse<GetDiseaseGroupResponseDto> {
    @Expose()
    @Type(() => GetDiseaseGroupResponseDto)
    public readonly data: GetDiseaseGroupResponseDto[];
}