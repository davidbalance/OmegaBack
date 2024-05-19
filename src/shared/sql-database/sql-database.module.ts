import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                "DATABASE_SQL_TYPE": Joi.string().required(),
                "DATABASE_SQL_HOST": Joi.string().required(),
                "DATABASE_SQL_PORT": Joi.number().required(),
                "DATABASE_SQL_USERNAME": Joi.string().required(),
                "DATABASE_SQL_PASSWORD": Joi.string().required(),
                "DATABASE_SQL_DATABASE": Joi.string().required(),
                "APP_ENVIRONMENT": Joi.string().required(),
            }),
            cache: true,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                type: config.get<any>("DATABASE_SQL_TYPE"),
                host: config.get<string>("DATABASE_SQL_HOST"),
                port: config.get<number>("DATABASE_SQL_PORT"),
                username: config.get<string>("DATABASE_SQL_USERNAME"),
                password: config.get<string>("DATABASE_SQL_PASSWORD"),
                database: config.get<string>("DATABASE_SQL_DATABASE"),
                synchronize: config.get<"production" | "development">("APP_ENVIRONMENT") !== 'production',
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
