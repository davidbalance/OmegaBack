import { IncrementRepository, IncrementRepositoryToken } from "@local-increment/local-increment/repository/increment.repository";
import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { IncrementDomain } from "@local-increment/local-increment/domain/increment.domain";
import { IncrementDomainMapper } from "../../mapper/increment/increment.mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { AggregateEvent } from "@shared/shared/domain";
import { IncrementIsEvent, IncrementNextEventPayload } from "@local-increment/local-increment/event/increment.event";

@Injectable()
export class IncrementPrismaRepository implements IncrementRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOne(key: string): Promise<IncrementDomain | null> {
        try {
            const value = await this.prisma.increment.findUnique({
                where: { key: key }
            });
            return value ? IncrementDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(value: IncrementDomain): Promise<void> {
        const events = value.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<IncrementDomain>(event))
                await this.createIncrement(value);

            else if (IncrementIsEvent.isIncrementNextEvent(event))
                await this.updateIncrement(event.value);
        }
    }

    async createIncrement(value: IncrementDomain): Promise<void> {
        try {
            const data = IncrementDomainMapper.toPrisma(value);
            await this.prisma.increment.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async updateIncrement(value: IncrementNextEventPayload): Promise<void> {
        try {
            await this.prisma.increment.update({
                where: { id: value.incrementId },
                data: { count: value.incrementCount }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const IncrementDomainRepositoryProvider: Provider = {
    provide: IncrementRepositoryToken,
    useClass: IncrementPrismaRepository,
}