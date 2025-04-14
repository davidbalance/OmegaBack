import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalJwtAccessProvider } from './local-jwt-access.service';
import { LocalJwtRefreshProvider } from './local-jwt-refresh.service';
import { JwtAccessProviderToken, JwtRefreshProviderToken } from '@shared/shared/nest/inject';
import { ZodValidatorFactory } from '@shared/shared/nest/factories';
import localJwtSchema from './config/local-jwt.schema'
import localJwtConfig, { LocalJwtConfig, LocalJwtConfigName } from './config/local-jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: ZodValidatorFactory(localJwtSchema),
      load: [localJwtConfig]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const value = config.getOrThrow<LocalJwtConfig>(LocalJwtConfigName);
        return {
          secret: value.access_secret,
          signOptions: {
            expiresIn: value.access_expires_in
          }
        }
      }
    })
  ],
  providers: [
    LocalJwtAccessProvider,
    LocalJwtRefreshProvider
  ],
  exports: [
    JwtAccessProviderToken,
    JwtRefreshProviderToken
  ],
})
export class LocalJwtModule { }
