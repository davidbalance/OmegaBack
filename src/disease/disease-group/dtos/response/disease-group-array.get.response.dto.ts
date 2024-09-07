import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { DiseaseGroup } from "./disease-group.base.response.dto";

export class GetDiseaseGroupArrayResponseDto implements ObjectArrayResponse<DiseaseGroup> {
    @Expose()
    @Type(() => DiseaseGroup)
    public readonly data: DiseaseGroup[];
}