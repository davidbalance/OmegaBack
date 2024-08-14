import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Token } from "./entities/token.entity";
import { TokenRepository } from "./repositories/token.repository";
import { TokenService } from "./services/token.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Token]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_DEFAULT_SECRET"),
        signOptions: {
          expiresIn: `${config.get<number>("JWT_DEFAULT_EXPIRES_IN")}s`
        }
      })
    })
  ],
  providers: [
    TokenService,
    TokenRepository
  ],
  exports: [TokenService]
})
export class TokenModule { }
