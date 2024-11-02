import { registerAs } from "@nestjs/config";

export const ClientConfigName = 'ClientConfig';

export interface ClientConfig {
    key: string;
}

export default registerAs(ClientConfigName, (): ClientConfig => ({
    key: process.env.CLIENT_KEY,
}));