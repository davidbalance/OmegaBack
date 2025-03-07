import { registerAs } from "@nestjs/config";

export const ServerConfigName = 'server';

export interface ServerConfig {
    nodeEnv: 'production' | 'development';
    network: string;
    port: number;
}

export default registerAs(ServerConfigName, () => ({
    nodeEnv: process.env.NODE_ENV,
    network: process.env.NETWORK,
    port: parseInt(process.env.PORT || '3000')
}));