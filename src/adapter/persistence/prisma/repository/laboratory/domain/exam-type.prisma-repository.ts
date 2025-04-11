import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeDomainMapper } from "../../../mapper/laboratory/domain/exam-type.domain-mapper ";
import { ExamTypeIsEvent, ExamTypeRemovedEventPayload, ExamTypeRenamedEventPayload, ExamTypeSubtypeMovedEventPayload, ExamTypeSubtypeRemovedEventPayload } from "@omega/laboratory/core/domain/exam/events/exam-type.events";
import { ExamSubtypeDomainMapper } from "../../../mapper/laboratory/domain/exam-subtype.domain-mapper";
import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";
import { ExamSubtypeExamRemovedEventPayload, ExamSubtypeIsEvent, ExamSubtypeMoveSubtypeEventPayload, ExamSubtypeRenamedEventPayload } from "@omega/laboratory/core/domain/exam/events/exam-subtype.events";
import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";
import { ExamDomainMapper } from "../../../mapper/laboratory/domain/exam.domain-mapper";
import { ExamTypeAggregateRepositoryToken } from "@omega/laboratory/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamIsEvent } from "@omega/laboratory/core/domain/exam/events/exam.events";
import { ExamSubtypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-subtype-external-key.value-object";
import { ExamExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-external-key.value-object";
import { ExamTypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-type-external-key.value-object";

@Injectable()
export class ExamTypePrismaRepository implements ExamTypeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<ExamTypeProps>): Promise<ExamType | null> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeProps, Prisma.ExamTypeWhereInput>(filter.filter);
            const value = await this.prisma.examType.findFirst({
                include: {
                    externalKeys: true,
                    subtypes: {
                        include: {
                            externalKeys: true,
                            exams: { include: { externalKeys: true } }
                        }
                    },
                },
                where: where
            });
            return value ? ExamTypeDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: ExamType): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<ExamType>(event))
                await this.createExamType(aggregate);

            else if (ExamTypeIsEvent.isExamTypeRenamedEvent(event))
                await this.renameExamType(event.value);

            else if (ExamTypeIsEvent.isExamTypeRemovedEvent(event))
                await this.removeExamType(event.value);

            else if (ExamTypeIsEvent.isExamTypeSubtypeAddedEvent(event))
                await this.addSubtype(event.value);

            else if (ExamTypeIsEvent.isExamTypeSubtypeRemovedEvent(event))
                await this.removeSubtype(event.value);

            else if (ExamTypeIsEvent.isExamTypeSubtypeMovedEvent(event))
                await this.moveSubtype(event.value);

            else if (ExamTypeIsEvent.isExamTypeExternalKeyAddedEvent(event))
                await this.addExamTypeExternalKey(event.value);

            else if (ExamSubtypeIsEvent.isExamSubtypeRenamedEvent(event))
                await this.renameSubtype(event.value);

            else if (ExamSubtypeIsEvent.isExamSubtypeExamAddedEvent(event))
                await this.addExam(event.value);

            else if (ExamSubtypeIsEvent.isExamSubtypeExamRemovedEvent(event))
                await this.removeExam(event.value);

            else if (ExamSubtypeIsEvent.isExamSubtypeExamMovedEvent(event))
                await this.moveExam(event.value);

            else if (ExamSubtypeIsEvent.isExamSubtypeExternalKeyAddedEvent(event))
                await this.addSubtypeExternalKey(event.value);

            else if (ExamIsEvent.isExamExternalKeyAddedEvent(event))
                await this.addExamExternalKey(event.value);
        }
    }

    async createExamType(value: ExamType): Promise<void> {
        try {
            const data = ExamTypeDomainMapper.toPrisma(value);
            await this.prisma.examType.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameExamType(value: ExamTypeRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.examType.update({ where: { id: value.typeId }, data: { name: value.name } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeExamType(value: ExamTypeRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.examType.delete({ where: { id: value.typeId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addExamTypeExternalKey(value: ExamTypeExternalKeyProps): Promise<void> {
        try {
            await this.prisma.examTypeExternalKey.create({
                data: { owner: value.owner, value: value.value, typeId: value.typeExamId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addSubtype(value: ExamSubtype): Promise<void> {
        try {
            const data = ExamSubtypeDomainMapper.toPrisma(value);
            await this.prisma.examSubtype.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeSubtype(value: ExamTypeSubtypeRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.examSubtype.delete({ where: { id: value.subtypeId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async moveSubtype(value: ExamTypeSubtypeMovedEventPayload): Promise<void> {
        try {
            await this.prisma.examSubtype.update({ where: { id: value.subtypeId }, data: { typeId: value.toExamType } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameSubtype(value: ExamSubtypeRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.examSubtype.update({ where: { id: value.subtypeId }, data: { name: value.subtypeName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addSubtypeExternalKey(value: ExamSubtypeExternalKeyProps): Promise<void> {
        try {
            await this.prisma.examSubtypeExternalKey.create({
                data: { owner: value.owner, value: value.value, subtypeId: value.subtypeExamId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addExam(value: Exam): Promise<void> {
        try {
            const data = ExamDomainMapper.toPrisma(value);
            await this.prisma.exam.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeExam(value: ExamSubtypeExamRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.exam.delete({ where: { id: value.examId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async moveExam(value: ExamSubtypeMoveSubtypeEventPayload): Promise<void> {
        try {
            await this.prisma.exam.update({ where: { id: value.examId }, data: { subtypeId: value.toSubtypeId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addExamExternalKey(value: ExamExternalKeyProps): Promise<void> {
        try {
            await this.prisma.examExternalKey.create({
                data: { owner: value.owner, value: value.value, examId: value.examId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamTypeAggregateRepositoryProvider: Provider = {
    provide: ExamTypeAggregateRepositoryToken,
    useClass: ExamTypePrismaRepository,
}