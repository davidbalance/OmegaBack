import { registerAs } from "@nestjs/config";

export const DatabaseConfigName = 'DatabaseConfig';

export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export default registerAs(DatabaseConfigName, (): DatabaseConfig => ({
    type: process.env.DATABASE_SQL_TYPE,
    host: process.env.DATABASE_SQL_HOST,
    port: Number(process.env.DATABASE_SQL_PORT),
    username: process.env.DATABASE_SQL_USERNAME,
    password: process.env.DATABASE_SQL_PASSWORD,
    database: process.env.DATABASE_SQL_DATABASE,
}));