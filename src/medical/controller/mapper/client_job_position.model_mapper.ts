import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ClientJobPositionResponseDto } from "../dto/response/client.dto";

export class ClientJobPositionModelMapper {
    public static toDTO(value: ClientJobPositionModel): ClientJobPositionResponseDto {
        return {
            patientDni: value.patientDni,
            jobPosition: value.jobPosition ?? null
        }
    }
}