import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export const connectionSource = new DataSource({
    type: configService.get<any>("DATABASE_SQL_TYPE"),
    host: configService.get<string>("DATABASE_SQL_HOST"),
    port: configService.get<number>("DATABASE_SQL_PORT"),
    username: configService.get<string>("DATABASE_SQL_USERNAME"),
    password: configService.get<string>("DATABASE_SQL_PASSWORD"),
    database: configService.get<string>("DATABASE_SQL_DATABASE"),
    entities: [path.join(__dirname, 'src', '**', '*.entity{.js,.ts}')],
    migrations: [path.join(__dirname, 'database/migrations', '*{.js,.ts}')],
    logging: true,
});