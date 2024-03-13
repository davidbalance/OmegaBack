import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                "database.sql.type": Joi.string().required(),
                "database.sql.host": Joi.string().required(),
                "database.sql.port": Joi.number().required(),
                "database.sql.username": Joi.string().required(),
                "database.sql.password": Joi.string().required(),
                "database.sql.database": Joi.string().required(),
                "app.enviroment": Joi.string().required(),
            }),
            cache: true,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                type: config.get<any>("database.sql.type"),
                host: config.get<string>("database.sql.host"),
                port: config.get<number>("database.sql.port"),
                username: config.get<string>("database.sql.username"),
                password: config.get<string>("database.sql.password"),
                database: config.get<string>("database.sql.database"),
                synchronize: config.get<"production" | "development">("app.enviroment") === 'production',
                autoLoadEntities: true
            }),
            inject: [ConfigService],
        })
    ]
})
export class SqlDatabaseModule {
    static forFeature(entities: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(entities);
    }
}
