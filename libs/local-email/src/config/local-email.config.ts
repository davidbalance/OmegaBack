import { registerAs } from "@nestjs/config";

export const LocalEmailConfigName: string = 'LocalEmailConfigName';

export interface LocalEmailConfig {
    auth_user: string;
    auth_password: string;
    default_name: string;
    default_address: string;
    server_host: string;
    server_port: number;
    server_secure: boolean;
}

export default registerAs(LocalEmailConfigName, (): LocalEmailConfig => ({
    auth_user: process.env.LOCAL_EMAIL_USER || '',
    auth_password: process.env.LOCAL_EMAIL_PASS || '',
    default_name: process.env.LOCAL_EMAIL_DEFAULT_NAME || '',
    default_address: process.env.LOCAL_DEFAULT_ADDRESS || '',
    server_host: process.env.LOCAL_EMAIL_HOST || '',
    server_port: process.env.LOCAL_EMAIL_PORT ? parseInt(process.env.LOCAL_EMAIL_PORT) : 1000,
    server_secure: process.env.LOCAL_EMAIL_SECURE?.toLocaleLowerCase() === 'true'
}))