import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { DiseaseGroupResponseDto } from "./disease-group.dto";

export class GETDiseaseGroupResponseDto extends DiseaseGroupResponseDto { }

export class GETDiseaseGroupArrayResponseDto
    extends ObjectArrayResponse<GETDiseaseGroupResponseDto> { }