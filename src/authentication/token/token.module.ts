import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { SqlDatabaseModule } from 'src/shared';
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
        secret: config.get<string>("jwt.default.secret"),
        signOptions: {
          expiresIn: `${config.get<number>("jwt.default.expiresIn")}s`
        }
      })
    })
  ],
  controllers: [TokenController],
  providers: [TokenService, TokenRepository],
  exports: [TokenService]
})
export class TokenModule { }
