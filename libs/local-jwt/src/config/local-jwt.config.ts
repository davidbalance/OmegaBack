import { registerAs } from "@nestjs/config";

export const LocalJwtConfigName: string = 'LocalJwtConfig';

export interface LocalJwtConfig {
    access_secret: string;
    access_expires_in: number;
    refresh_secret: string;
    refresh_expires_in: number;
}

export default registerAs(LocalJwtConfigName, (): LocalJwtConfig => ({
    access_secret: process.env.JWT_ACCESS_SECRET || 'default-secret',
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN ? parseInt(process.env.JWT_ACCESS_EXPIRES_IN) : 300,
    refresh_secret: process.env.JWT_REFRESH_SECRET || 'default-secret',
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN ? parseInt(process.env.JWT_REFRESH_EXPIRES_IN) : 300
}))