import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Token } from './entities/token.entity';
import { TokenRepository } from './token.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
