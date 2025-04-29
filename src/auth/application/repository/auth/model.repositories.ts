import { ApiKeyModel } from "@omega/auth/core/model/auth/api-key.model";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api-key-value.model";
import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";
import { TokenModel } from "@omega/auth/core/model/auth/token.model";
import { ModelRepository } from "@shared/shared/providers";

export type ApiKeyValueRepository = ModelRepository<ApiKeyValueModel>;
export type ApiKeyRepository = ModelRepository<ApiKeyModel>;
export type AuthResourceRepository = ModelRepository<AuthResourceModel>;
export type AuthRepository = ModelRepository<AuthModel>;
export type TokenRepository = ModelRepository<TokenModel>;