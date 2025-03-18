import { Inject, Injectable, Provider } from '@nestjs/common';
import { IncrementProvider } from '@shared/shared/providers';
import { IncrementRepository, IncrementRepositoryToken } from './repository/increment.repository';
import { IncrementDomain } from './domain/increment.domain';
import { IncrementProviderToken } from '@shared/shared/nest/inject';

@Injectable()
export class LocalIncrementService implements IncrementProvider {
    constructor(
        @Inject(IncrementRepositoryToken) private readonly repository: IncrementRepository
    ) { }

    async next(key: string): Promise<number> {
        let value = await this.repository.findOne(key);
        if (!value) {
            value = IncrementDomain.create(key);
        }
        const nextValue = value.next();
        await this.repository.saveAsync(value);
        return nextValue;
    }
}

export const LocalIncrementProvider: Provider = {
    provide: IncrementProviderToken,
    useClass: LocalIncrementService
}
