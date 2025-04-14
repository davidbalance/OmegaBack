import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementResponseDto } from "../dto/response/management.dto";

export class ManagementModelMapper {
    public static toDTO(value: ManagementModel): ManagementResponseDto {
        return {
            managementId: value.managementId,
            managementName: value.managementName
        }
    }
}