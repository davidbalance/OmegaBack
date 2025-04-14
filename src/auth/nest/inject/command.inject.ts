import { Inject } from "@nestjs/common";

export const AuthAccessTokenCommandToken = 'AuthAccessTokenCommand';
export const AuthAddApiKeyCommandToken = 'AuthAddApiKeyCommand';
export const AuthAddLogoCommandToken = 'AuthAddLogoCommand';
export const AuthAddResourcesCommandToken = 'AuthAddResourcesCommand';
export const AuthAddTokenCommandToken = 'AuthAddTokenCommand';
export const AuthCreateCommandToken = 'AuthCreateCommand';
export const AuthEditPasswordCommandToken = 'AuthEditPasswordCommand';
export const AuthRefreshTokenCommandToken = 'AuthRefreshTokenCommand';
export const AuthRemoveApiKeyCommandToken = 'AuthRemoveApiKeyCommand';
export const AuthRemoveResourceCommandToken = 'AuthRemoveResourceCommand';
export const AuthRemoveTokenCommandToken = 'AuthRemoveTokenCommand';
export const AuthValidateApiKeyCommandToken = 'AuthValidateApiKeyCommand';
export const AuthValidateCommandToken = 'AuthValidateCommand';

export const LogoCreateCommandToken = 'LogoCreateCommand';

export const ResourceCreateCommandToken = 'ResourceCreateCommand';
export const ResourceEditCommandToken = 'ResourceEditCommand';
export const ResourceRemoveCommandToken = 'ResourceRemoveCommand';

const command = {
    AuthAccessToken: AuthAccessTokenCommandToken,
    AuthAddApiKey: AuthAddApiKeyCommandToken,
    AuthAddLogo: AuthAddLogoCommandToken,
    AuthAddResources: AuthAddResourcesCommandToken,
    AuthAddToken: AuthAddTokenCommandToken,
    AuthCreate: AuthCreateCommandToken,
    AuthEdit: AuthEditPasswordCommandToken,
    AuthRefreshToken: AuthRefreshTokenCommandToken,
    AuthRemoveApiKey: AuthRemoveApiKeyCommandToken,
    AuthRemoveResource: AuthRemoveResourceCommandToken,
    AuthRemoveToken: AuthRemoveTokenCommandToken,
    AuthValidateApiKey: AuthValidateApiKeyCommandToken,
    AuthValidate: AuthValidateCommandToken,
    LogoCreate: LogoCreateCommandToken,
    ResourceCreate: ResourceCreateCommandToken,
    ResourceEdit: ResourceEditCommandToken,
    ResourceRemove: ResourceRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);