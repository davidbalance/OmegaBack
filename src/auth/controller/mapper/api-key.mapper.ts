import { ApiKeyModel } from "@omega/auth/core/model/auth/api-key.model";
import { ApiKeyResponseDto } from "../dto/response/api-key.dto";

export class ApiKeyMapper {
    static toDTO(value: ApiKeyModel): ApiKeyResponseDto {
        return {
            apiKeyId: value.apiKeyId,
            apiKeyName: value.apiKeyName
        }
    }
}