import { ClientResponseDto } from "../dto/response/client.dto";
import { ClientModel } from "@omega/medical/core/model/client/client.model";

export class ClientModelMapper {
    public static toDTO(value: ClientModel): ClientResponseDto {
        return {
            companyRuc: value.companyRuc,
            patientBirthday: value.patientBirthday,
            patientDni: value.patientDni,
            patientGender: value.patientGender,
            patientLastname: value.patientLastname,
            patientName: value.patientName,
            patientRole: value.patientRole ?? null,
        }
    }
}