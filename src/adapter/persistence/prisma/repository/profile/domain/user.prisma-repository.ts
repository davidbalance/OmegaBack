import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { User, UserProps } from "@omega/profile/core/domain/user/user.domain";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { UserAttributeRemovedEventPayload, UserAttributeUpdatedValueEventPayload, UserAuthAddedEventPayload, UserAuthRemovedEventPayload, UserDoctorAddFileEventPayload, UserEditedEventPayload, UserIsEvent, UserRemovedEventPayload } from "@omega/profile/core/domain/user/events/user.events";
import { UserDomainMapper } from "../../../mapper/profile/domain/user.domain-mapper";
import { Attribute } from "@omega/profile/core/domain/user/attribute.domain";
import { AttributeDomainMapper } from "../../../mapper/profile/domain/attribute.domain-mapper";
import { PatientDomainMapper } from "../../../mapper/profile/domain/patient.domain-mapper";
import { Patient } from "@omega/profile/core/domain/user/patient.domain";
import { Doctor } from "@omega/profile/core/domain/user/doctor.domain";
import { DoctorDomainMapper } from "../../../mapper/profile/domain/doctor.domain-mapper";
import { UserAggregateRepositoryToken } from "@omega/profile/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<UserProps>): Promise<User | null> {
        try {
            const where = PrismaFilterMapper.map<UserProps, Prisma.UserWhereInput>(filter.filter);
            const value = await this.prisma.user.findFirst({
                include: { attributes: true, doctor: true, patient: true },
                where: where
            });
            return value ? UserDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: User): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<User>(event))
                await this.createUser(aggregate);

            else if (UserIsEvent.isUserEditedEvent(event))
                await this.editUser(event.value);

            else if (UserIsEvent.isUserRemovedEvent(event))
                await this.removeUser(event.value);

            else if (UserIsEvent.isUserAuthAddedEvent(event))
                await this.addAuth(event.value);

            else if (UserIsEvent.isUserAuthRemovedEvent(event))
                await this.removeAuth(event.value);

            else if (UserIsEvent.isUserAttributeAddedEvent(event))
                await this.addAttribute(event.value);

            else if (UserIsEvent.isUserAttributeUpdatedValueEvent(event))
                await this.updateAttribute(event.value);

            else if (UserIsEvent.isUserAttributeRemovedEvent(event))
                await this.removeAttribute(event.value);

            else if (UserIsEvent.isUserPatientAddedEvent(event))
                await this.addPatient(event.value);

            else if (UserIsEvent.isUserDoctorAddedEvent(event))
                await this.addDoctor(event.value);

            else if (UserIsEvent.isUserDoctorAddFileEvent(event))
                await this.addDoctorFile(event.value);
        }
    }

    async createUser(value: User): Promise<void> {
        try {
            const data = UserDomainMapper.toPrisma(value);
            await this.prisma.user.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editUser(value: UserEditedEventPayload): Promise<void> {
        try {
            await this.prisma.user.update({
                where: { id: value.userId },
                data: {
                    name: value.userName,
                    lastname: value.userLastname
                }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeUser(value: UserRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.user.update({
                where: { id: value.userId },
                data: { isActive: false }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addAuth(value: UserAuthAddedEventPayload): Promise<void> {
        try {
            await this.prisma.user.update({ where: { id: value.userId }, data: { auth: value.auth } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeAuth(value: UserAuthRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.user.update({ where: { id: value.userId }, data: { auth: null } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addAttribute(value: Attribute): Promise<void> {
        try {
            const data = AttributeDomainMapper.toPrisma(value);
            await this.prisma.attribute.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async updateAttribute(value: UserAttributeUpdatedValueEventPayload): Promise<void> {
        try {
            await this.prisma.attribute.update({ where: { id: value.attributeId }, data: { value: value.attributeValue } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeAttribute(value: UserAttributeRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.attribute.delete({ where: { id: value.attributeId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addPatient(value: Patient): Promise<void> {
        try {
            const data = PatientDomainMapper.toPrisma(value);
            await this.prisma.patient.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addDoctor(value: Doctor): Promise<void> {
        try {
            const data = DoctorDomainMapper.toPrisma(value);
            await this.prisma.doctor.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addDoctorFile(value: UserDoctorAddFileEventPayload): Promise<void> {
        try {
            await this.prisma.doctor.update({ where: { id: value.doctorId }, data: { hasFile: true } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const UserAggregateRepositoryProvider: Provider = {
    provide: UserAggregateRepositoryToken,
    useClass: UserPrismaRepository,
}