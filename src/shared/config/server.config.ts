import { registerAs } from "@nestjs/config";

export const ServerConfigName = 'ServerConfig';

export interface ServerConfig {
    port: number;
    environment: string;
    app_client: string;
}

export default registerAs(ServerConfigName, (): ServerConfig => ({
    port: Number(process.env.APP_PORT || 3000),
    environment: process.env.NODE_ENV,
    app_client: process.env.APP_CLIENT,
}));