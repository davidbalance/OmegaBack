import { ApiKeyModel } from "@omega/auth/core/model/auth/api_key.model";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api_key_value.model";
import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth_resource.model";
import { TokenModel } from "@omega/auth/core/model/auth/token.model";
import { ModelRepository } from "@shared/shared/providers";

export type ApiKeyValueRepository = ModelRepository<ApiKeyValueModel>;
export type ApiKeyRepository = ModelRepository<ApiKeyModel>;
export type AuthResourceRepository = ModelRepository<AuthResourceModel>;
export type AuthRepository = ModelRepository<AuthModel>;
export type TokenRepository = ModelRepository<TokenModel>;