import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshProviderToken } from '@shared/shared/nest/inject';
import { JwtProvider } from '@shared/shared/providers/jwt.provider';
import { LocalJwtConfig, LocalJwtConfigName } from './config/local-jwt.config';
import { InternalError } from '@shared/shared/domain/error';

@Injectable()
export class LocalJwtRefreshService implements JwtProvider {

    constructor(
        @Inject(JwtService) private readonly jwt: JwtService,
        @Inject(ConfigService) private readonly config: ConfigService
    ) { }

    createJwt<T extends object>(payload: T): string {
        try {
            const values = this.config.getOrThrow<LocalJwtConfig>(LocalJwtConfigName);
            return this.jwt.sign(payload, {
                expiresIn: values.refresh_expires_in,
                secret: values.refresh_secret
            });
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Fail while creating the JSONWebToken.')
        }
    }

    validateJwt<T>(jwt: string): T {
        try {
            return this.jwt.decode<T>(jwt);
        } catch (error) {
            Logger.error(error);
            throw new InternalError('JWT validation fails.')
        }
    }
}

export const LocalJwtRefreshProvider: Provider = {
    provide: JwtRefreshProviderToken,
    useClass: LocalJwtRefreshService
}