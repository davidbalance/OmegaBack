import { UserAttributeResponseDto } from "../dto/response/user_attribute.dto";
import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";

export class UserAttributeModelMapper {
    public static toDTO(value: UserAttributeModel): UserAttributeResponseDto {
        return {
            attributeId: value.attributeId,
            attributeName: value.attributeName,
            attributeValue: value.attributeValue,
            userId: value.userId,
        }
    }
}