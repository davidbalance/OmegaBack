import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { DiseaseGroupResponseDto } from "./disease-group.dto";
import { Expose, Type } from "class-transformer";

export class GETDiseaseGroupResponseDto extends DiseaseGroupResponseDto { }

export class GETDiseaseGroupArrayResponseDto implements ObjectArrayResponse<GETDiseaseGroupResponseDto> {
    @Expose()
    @Type(() => GETDiseaseGroupResponseDto)
    public readonly data: GETDiseaseGroupResponseDto[];
}