import { registerAs } from "@nestjs/config";

export const RedisConfigName = 'RedisConfig';

export interface RedisConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export default registerAs(RedisConfigName, (): RedisConfig => ({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_POST || 6379),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
}));