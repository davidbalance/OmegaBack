import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ClientDomainMapper } from "../../../mapper/medical/domain/client.domain-mapper";
import { ClientAreaAddedEventPayload, ClientDeletedEventPayload, ClientEditedEventPayload, ClientEmailRemovedEventPayload, ClientEmailSettedAsDefaultEventPayload, ClientIsEvent, ClientJobPositionAddedEventPayload, ClientManagementAddedEventPayload } from "@omega/medical/core/domain/client/events/client.events";
import { Email } from "@omega/medical/core/domain/client/email.domain";
import { EmailDomainMapper } from "../../../mapper/medical/domain/email.domain-mapper";
import { ClientAggregateRepositoryToken } from "@omega/medical/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { Record } from "@omega/medical/core/domain/client/record.domain";
import { RecordDomainMapper } from "../../../mapper/medical/domain/record.domain-mapper";

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<ClientProps>): Promise<Client | null> {
        try {
            const where = PrismaFilterMapper.map<ClientProps, Prisma.MedicalClientWhereInput>(filter.filter);
            const value = await this.prisma.medicalClient.findFirst({
                include: { email: true, records: true },
                where: where
            });
            return value ? ClientDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Client): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Client>(event))
                await this.createClient(aggregate);

            else if (ClientIsEvent.isClientEditedEvent(event))
                await this.editClient(event.value);

            else if (ClientIsEvent.isClientDeletedEvent(event))
                await this.removeClient(event.value);

            else if (ClientIsEvent.isClientAddedEmailEvent(event))
                await this.addEmail(event.value);

            else if (ClientIsEvent.isClientEmailSettedAsDefault(event))
                await this.setEmailDefault(event.value);

            else if (ClientIsEvent.isClientEmailRemovedEvent(event))
                await this.removeEmail(event.value);

            else if (ClientIsEvent.isClientManagementAddedEvent(event))
                await this.addManagement(event.value);

            else if (ClientIsEvent.isClientAreaAddedEvent(event))
                await this.addArea(event.value);

            else if (ClientIsEvent.isClientJobPositionAddedEvent(event))
                await this.addJobPosition(event.value);

            else if (ClientIsEvent.isClientRecordAddedEvent(event))
                await this.addRecord(event.value);
        }
    }

    async createClient(value: Client): Promise<void> {
        try {
            const data = ClientDomainMapper.toPrisma(value);
            await this.prisma.medicalClient.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editClient(value: ClientEditedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalClient.update({ where: { patientDni: value.patientDni }, data: { ...value } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeClient(value: ClientDeletedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalClient.delete({ where: { patientDni: value.dni } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addEmail(value: Email): Promise<void> {
        try {
            const data = EmailDomainMapper.toPrisma(value);
            await this.prisma.medicalEmail.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async setEmailDefault(value: ClientEmailSettedAsDefaultEventPayload): Promise<void> {
        try {
            await this.prisma.medicalEmail.updateMany({ where: { clientId: value.clientId }, data: { default: false } });
            await this.prisma.medicalEmail.update({ where: { id: value.emailId }, data: { default: true } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeEmail(value: ClientEmailRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalEmail.delete({ where: { id: value.emailId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addManagement(value: ClientManagementAddedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalClient.update({ where: { id: value.clientId }, data: { managementId: value.managementId, managementName: value.managementName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addArea(value: ClientAreaAddedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalClient.update({ where: { id: value.clientId }, data: { areaId: value.areaId, areaName: value.areaName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addJobPosition(value: ClientJobPositionAddedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalClient.update({ where: { id: value.clientId }, data: { jobPosition: value.jobPosition } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addRecord(value: Record): Promise<void> {
        try {
            const data = RecordDomainMapper.toPrisma(value);
            await this.prisma.medicalRecord.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientAggregateRepositoryProvider: Provider = {
    provide: ClientAggregateRepositoryToken,
    useClass: ClientPrismaRepository,
}