import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { PrismaService } from "../../../prisma.service";
import { Auth, AuthProps } from "@omega/auth/core/domain/auth/auth.domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Prisma } from "@prisma/client";
import { AuthDomainMapper } from "../../../mapper/auth/domain/auth.domain-mapper";
import { AuthApikeyRemovedEventPayload, AuthIsEvent, AuthLogoAddedEventPayload, AuthPasswordEditedEventPayload, AuthResourceAddedEventPayload, AuthResourceRemovedEventPayload, AuthTokenRemovedEventPayload } from "@omega/auth/core/domain/auth/events/auth.events";
import { ApiKeyDomainMapper } from "../../../mapper/auth/domain/api-key.domain-mapper";
import { ApiKey } from "@omega/auth/core/domain/auth/api-key.domain";
import { TokenDomainMapper } from "../../../mapper/auth/domain/token.domain-mapper";
import { Token } from "@omega/auth/core/domain/auth/token.domain";
import { AuthAggregateRepositoryToken } from "@omega/auth/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<AuthProps>): Promise<Auth | null> {
        try {
            const where = PrismaFilterMapper.map<AuthProps, Prisma.AuthWhereInput>(filter.filter);
            const value = await this.prisma.auth.findFirst({
                include: { apikeys: true, authResource: true, token: true },
                where: where
            });
            return value ? AuthDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Auth): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Auth>(event))
                await this.createAuth(aggregate);

            else if (AuthIsEvent.isAuthPasswordEditedEvent(event))
                await this.editPassword(event.value);

            else if (AuthIsEvent.isAuthApikeyAddedEvent(event))
                await this.addApikey(event.value);

            else if (AuthIsEvent.isAuthApikeyRemovedEvent(event))
                await this.removeApikey(event.value);

            else if (AuthIsEvent.isAuthTokenAddedEvent(event))
                await this.addToken(event.value);

            else if (AuthIsEvent.isAuthTokenRemovedEvent(event))
                await this.removeToken(event.value);

            else if (AuthIsEvent.isAuthResourceAddedEvent(event))
                await this.addResource(event.value);

            else if (AuthIsEvent.isAuthResourceRemovedEvent(event))
                await this.removeResource(event.value);

            else if (AuthIsEvent.isAuthLogoAddedEvent(event))
                await this.addLogo(event.value);
        }
    }

    async createAuth(value: Auth): Promise<void> {
        try {
            const data = AuthDomainMapper.toPrisma(value);
            await this.prisma.auth.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editPassword(value: AuthPasswordEditedEventPayload): Promise<void> {
        try {
            await this.prisma.auth.update({ where: { id: value.authId }, data: { password: value.password } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addApikey(value: ApiKey): Promise<void> {
        try {
            const data = ApiKeyDomainMapper.toPrisma(value);
            await this.prisma.apiKey.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeApikey(value: AuthApikeyRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.apiKey.delete({ where: { id: value.apikeyId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addToken(value: Token): Promise<void> {
        try {
            const data = TokenDomainMapper.toPrisma(value);
            await this.prisma.token.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeToken(value: AuthTokenRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.token.delete({ where: { id: value.tokenId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addResource(value: AuthResourceAddedEventPayload): Promise<void> {
        try {
            await this.prisma.authResource.create({ data: { authId: value.authId, resourceId: value.resourceId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeResource(value: AuthResourceRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.authResource.delete({ where: { authId_resourceId: { authId: value.authId, resourceId: value.resourceId } } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addLogo(value: AuthLogoAddedEventPayload): Promise<void> {
        try {
            await this.prisma.auth.update({ where: { id: value.authId }, data: { logoId: value.logoId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AuthAggregateRepositoryProvider: Provider = {
    provide: AuthAggregateRepositoryToken,
    useClass: AuthPrismaRepository,
}