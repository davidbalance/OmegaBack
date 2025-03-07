import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailResponseDto } from "../dto/response/client.dto";

export class ClientEmailModelMapper {
    public static toDTO(value: ClientEmailModel): ClientEmailResponseDto {
        return {
            patientDni: value.patientDni,
            emailDefault: value.emailDefault,
            emailId: value.emailId,
            emailValue: value.emailValue
        }
    }
}