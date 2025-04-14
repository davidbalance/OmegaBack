import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api_key_value.model";
import { ApiKeyValueModel as PrismaApiKeyValueModel } from "@prisma/client";

export class ApiKeyValueModelMapper {
    static toModel(value: PrismaApiKeyValueModel): ApiKeyValueModel {
        return new ApiKeyValueModel({ ...value });
    }
}