import { registerAs } from "@nestjs/config";

export const AuthConfigName = 'AuthConfig';

export interface AuthConfig {
    jwt_secret: string;
    jwt_expires: number;
    jwt_referesh_secret: string;
    jwt_refresh_expires: number;
    apikey_expires: number;
}

export default registerAs(AuthConfigName, (): AuthConfig => ({
    jwt_secret: process.env.JWT_DEFAULT_SECRET,
    jwt_expires: Number(process.env.JWT_DEFAULT_EXPIRES_IN),
    jwt_referesh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    apikey_expires: Number(process.env.APIKEY_EXPIRES_IN),
}));