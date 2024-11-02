import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Token } from "./entities/token.entity";
import { TokenRepository } from "./repositories/token.repository";
import { TokenService } from "./services/token.service";
import { Module } from "@nestjs/common";
import { AuthConfig, AuthConfigName } from "@/shared/config/auth.config";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Token]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const auth = config.get<AuthConfig>(AuthConfigName);
        return {
          secret: auth.jwt_secret,
          signOptions: {
            expiresIn: `${auth.jwt_expires}s`
          }
        }
      }
    })
  ],
  providers: [
    TokenService,
    TokenRepository
  ],
  exports: [TokenService]
})
export class TokenModule { }
