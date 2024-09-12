import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExtendedDiseaseGroup } from "./extended-disease-group.base.response.dto";
import { Type, Expose } from "class-transformer";

export class GetDiseaseGroupArrayResponseDto implements ObjectArrayResponse<ExtendedDiseaseGroup> {
    @Type(() => ExtendedDiseaseGroup)
    @Expose() public readonly data: ExtendedDiseaseGroup[];
}