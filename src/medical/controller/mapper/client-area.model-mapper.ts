import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaResponseDto } from "../dto/response/client.dto";

export class ClientAreaModelMapper {
    public static toDTO(value: ClientAreaModel): ClientAreaResponseDto {
        return {
            patientDni: value.patientDni,
            areaId: value.areaId ?? null,
            areaName: value.areaName ?? null
        }
    }
}