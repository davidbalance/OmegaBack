import { ApiKeyModel } from "@omega/auth/core/model/auth/api_key.model";
import { ApiKeyResponseDto } from "../dto/response/api_key.dto";

export class ApiKeyMapper {
    static toDTO(value: ApiKeyModel): ApiKeyResponseDto {
        return {
            apiKeyId: value.apiKeyId,
            apiKeyName: value.apiKeyName
        }
    }
}