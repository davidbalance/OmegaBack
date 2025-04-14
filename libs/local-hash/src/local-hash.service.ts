import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { HashToken, HashType } from './local-hash.dependencies';
import { PasswordProvider } from '@shared/shared/providers/password.provider';
import { PasswordProviderToken } from '@shared/shared/nest/inject';
import { InternalError } from '@shared/shared/domain/error';

@Injectable()
export class LocalHashService implements PasswordProvider {
    constructor(
        @Inject(HashToken) private readonly hashProp: HashType
    ) { }

    hash(value: string): string {
        try {
            const saltOrRounds = this.hashProp.genSaltSync();
            return this.hashProp.hashSync(value, saltOrRounds);
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Hashing Error.');
        }
    }

    compare(actual: string, hash: string): boolean {
        try {
            return this.hashProp.compareSync(actual, hash);
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Compare hashed error.');
        }
    }
}

export const LocalHashProvider: Provider = {
    provide: PasswordProviderToken,
    useClass: LocalHashService
}