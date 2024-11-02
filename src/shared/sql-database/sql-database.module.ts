import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DatabaseConfig, DatabaseConfigName } from '../config/database.config';
import { ServerConfig, ServerConfigName } from '../config/server.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const db = config.get<DatabaseConfig>(DatabaseConfigName);
                const server = config.get<ServerConfig>(ServerConfigName);
                return {
                    ...db,
                    type: db.type as any,
                    synchronize: server.environment !== 'production',
                    autoLoadEntities: true
                }
            },
            inject: [ConfigService],
        })
    ]
})
export class SqlDatabaseModule {
    static forFeature(entities: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(entities);
    }
}
