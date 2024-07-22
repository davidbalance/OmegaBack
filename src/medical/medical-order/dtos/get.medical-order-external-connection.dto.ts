import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalOrderExternalConnectionResponse } from "./medical-order-external-connection.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalOrderExternalConnectionResponseDto extends MedicalOrderExternalConnectionResponse { }

export class GETMedicalOrderArrayExternalConnectionResponseDto implements ObjectArrayResponse<GETMedicalOrderExternalConnectionResponseDto> {
    @Expose()
    @Type(() => GETMedicalOrderExternalConnectionResponseDto)
    public readonly data: GETMedicalOrderExternalConnectionResponseDto[];
}