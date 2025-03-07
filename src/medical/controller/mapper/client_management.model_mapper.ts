import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";
import { ClientManagementResponseDto } from "../dto/response/client.dto";

export class ClientManagementModelMapper {
    public static toDTO(value: ClientManagementModel): ClientManagementResponseDto {
        return {
            patientDni: value.patientDni,
            managementId: value.managementId ?? null,
            managementName: value.managementName ?? null,
        }
    }
}