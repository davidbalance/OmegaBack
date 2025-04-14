import { ApiKeyModel } from "@omega/auth/core/model/auth/api_key.model";
import { ApiKeyModel as PrismaApiKeyModel } from "@prisma/client";

export class ApiKeyModelMapper {
    static toModel(value: PrismaApiKeyModel): ApiKeyModel {
        return new ApiKeyModel({ ...value });
    }
}