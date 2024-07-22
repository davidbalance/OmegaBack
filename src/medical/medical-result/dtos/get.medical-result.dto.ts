import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResultReponse } from "./medical-result.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalResultResponseDto extends MedicalResultReponse { }

export class GETMedicalResultArrayResponseDto implements ObjectArrayResponse<GETMedicalResultResponseDto> {
    @Expose()
    @Type(() => GETMedicalResultResponseDto)
    public readonly data: GETMedicalResultResponseDto[];
}