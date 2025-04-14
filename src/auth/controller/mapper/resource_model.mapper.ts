import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { ResourceResponseDto } from "../dto/response/resource.dto";

export class ResourceModelMapper {
    static toDTO(value: ResourceModel): ResourceResponseDto {
        return {
            resourceId: value.resourceId,
            resourceLabel: value.resourceLabel,
            resourceAddress: value.resourceAddress,
            resourceIcon: value.resourceIcon,
        }
    }
}