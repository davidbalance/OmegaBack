import { Logger } from "@nestjs/common";
import { ExamTypePrismaRepository } from "../exam-type.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { ExamTypeDomainMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/domain/exam-type.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamTypeIsEvent, ExamTypeRemovedEventPayload, ExamTypeRenamedEventPayload, ExamTypeSubtypeMovedEventPayload, ExamTypeSubtypeRemovedEventPayload } from "@omega/laboratory/core/domain/exam/events/exam-type.events";
import { ExamSubtypeExamRemovedEventPayload, ExamSubtypeIsEvent, ExamSubtypeMoveSubtypeEventPayload, ExamSubtypeRenamedEventPayload } from "@omega/laboratory/core/domain/exam/events/exam-subtype.events";
import { ExamIsEvent } from "@omega/laboratory/core/domain/exam/events/exam.events";
import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";
import { ExamTypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-type-external-key.value-object";
import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";
import { ExamSubtypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-subtype-external-key.value-object";
import { ExamExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-external-key.value-object";
import { Prisma } from "@prisma/client";
import { ExamSubtypeDomainMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/domain/exam-subtype.domain-mapper";
import { ExamDomainMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/domain/exam.domain-mapper";

describe("ExamTypePrismaRepository", () => {
    let repository: ExamTypePrismaRepository;
    let prisma: {
        examType: any;
        examTypeExternalKey: any;
        examSubtype: any;
        examSubtypeExternalKey: any;
        exam: any;
        examExternalKey: any;
    };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examType: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            examTypeExternalKey: {
                create: jest.fn()
            },
            examSubtype: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
            examSubtypeExternalKey: {
                create: jest.fn()
            },
            exam: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
            examExternalKey: {
                create: jest.fn()
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamTypePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamTypePrismaRepository>(ExamTypePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<ExamTypeProps> = { filter: [{ field: "id", operator: "eq", value: "id-123" }] };
        const mockPrismaWhere = { id: "id-123" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "examType-1" };
            const domainResult = { id: "examType-1" };

            prisma.examType.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamTypeDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examType.findFirst).toHaveBeenCalledWith({
                include: {
                    externalKeys: true,
                    subtypes: {
                        include: {
                            externalKeys: true,
                            exams: { include: { externalKeys: true } }
                        }
                    },
                },
                where: mockPrismaWhere,
            });
            expect(ExamTypeDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.examType.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.examType.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): ExamType => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as ExamType);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeRenamedEvent').mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeRemovedEvent').mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeSubtypeAddedEvent').mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeSubtypeRemovedEvent').mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeSubtypeMovedEvent').mockReturnValue(false);
            jest.spyOn(ExamTypeIsEvent, 'isExamTypeExternalKeyAddedEvent').mockReturnValue(false);
            jest.spyOn(ExamSubtypeIsEvent, 'isExamSubtypeRenamedEvent').mockReturnValue(false);
            jest.spyOn(ExamSubtypeIsEvent, 'isExamSubtypeExamAddedEvent').mockReturnValue(false);
            jest.spyOn(ExamSubtypeIsEvent, 'isExamSubtypeExamRemovedEvent').mockReturnValue(false);
            jest.spyOn(ExamSubtypeIsEvent, 'isExamSubtypeExamMovedEvent').mockReturnValue(false);
            jest.spyOn(ExamSubtypeIsEvent, 'isExamSubtypeExternalKeyAddedEvent').mockReturnValue(false);
            jest.spyOn(ExamIsEvent, 'isExamExternalKeyAddedEvent').mockReturnValue(false);
        });

        it("should call createExamType when event is ExamTypeCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "ExamTypeCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createExamType").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call renameExamType when event is ExamTypeRenamedEvent", async () => {
            const payload: ExamTypeRenamedEventPayload = { name: 'Exam type', typeId: 'type-id-123' };
            const aggregate = createFakeAggregate({ key: "ExamTypeRenamedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameExamType").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeExamType when event is ExamTypeRemovedEvent", async () => {
            const payload: ExamTypeRemovedEventPayload = { typeId: 'type-id-123' };
            const aggregate = createFakeAggregate({ key: "ExamTypeRemovedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeExamType").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addSubtype when event is ExamTypeSubtypeAddedEvent", async () => {
            const payload: ExamSubtype = {} as unknown as ExamSubtype;
            const aggregate = createFakeAggregate({ key: "ExamTypeSubtypeAddedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeSubtypeAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addSubtype").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeSubtype when event is ExamTypeSubtypeRemovedEvent", async () => {
            const payload: ExamTypeSubtypeRemovedEventPayload = { subtypeId: "id-123" };
            const aggregate = createFakeAggregate({ key: "ExamTypeSubtypeRemovedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeSubtypeRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeSubtype").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call moveSubtype when event is ExamTypeSubtypeMovedEvent", async () => {
            const payload: ExamTypeSubtypeMovedEventPayload = {
                fromExamType: 'type-id-123',
                subtypeId: 'subtype-id-123',
                toExamType: 'type-id-456'
            };
            const aggregate = createFakeAggregate({ key: "ExamTypeSubtypeMovedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeSubtypeMovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "moveSubtype").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addExamTypeExternalKey when event is ExamTypeExternalKeyAddedEvent", async () => {
            const payload: ExamTypeExternalKeyProps = {
                owner: 'test-owner',
                typeExamId: 'test-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "ExamTypeExternalKeyAddedEvent", value: payload });

            jest.spyOn(ExamTypeIsEvent, "isExamTypeExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addExamTypeExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call renameSubtype when event is ExamSubtypeRenamedEvent", async () => {
            const payload: ExamSubtypeRenamedEventPayload = {
                subtypeId: "subtype-id-123",
                subtypeName: "Subtype"
            };
            const aggregate = createFakeAggregate({ key: "ExamSubtypeRenamedEvent", value: payload });

            jest.spyOn(ExamSubtypeIsEvent, "isExamSubtypeRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameSubtype").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addExam when event is ExamSubtypeExamAddedEvent", async () => {
            const payload = {} as unknown as Exam;
            const aggregate = createFakeAggregate({ key: "ExamSubtypeExamAddedEvent", value: payload });

            jest.spyOn(ExamSubtypeIsEvent, "isExamSubtypeExamAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addExam").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeExam when event is ExamSubtypeExamRemovedEvent", async () => {
            const payload: ExamSubtypeExamRemovedEventPayload = { examId: 'id-123' };
            const aggregate = createFakeAggregate({ key: "ExamSubtypeExamRemovedEvent", value: payload });

            jest.spyOn(ExamSubtypeIsEvent, "isExamSubtypeExamRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeExam").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addSubtypeExternalKey when event is ExamSubtypeExternalKeyAddedEvent", async () => {
            const payload: ExamSubtypeExternalKeyProps = {
                owner: 'test-owner',
                subtypeExamId: 'subtype-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "ExamSubtypeExternalKeyAddedEvent", value: payload });

            jest.spyOn(ExamSubtypeIsEvent, "isExamSubtypeExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addSubtypeExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addExamExternalKey when event is ExamExternalKeyAddedEvent", async () => {
            const payload: ExamExternalKeyProps = {
                owner: 'test-owner',
                examId: 'exam-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "ExamExternalKeyAddedEvent", value: payload });

            jest.spyOn(ExamIsEvent, "isExamExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addExamExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {

        describe('createExamType', () => {
            const value = {} as unknown as ExamType;
            const mapped: Prisma.ExamTypeUncheckedCreateInput = { name: "Test Name" };

            it("should call Prisma create with mapped domain data", async () => {
                jest.spyOn(ExamTypeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createExamType(value);

                expect(ExamTypeDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.examType.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.examType.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(ExamTypeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createExamType(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('renameExamType', () => {
            const value: ExamTypeRenamedEventPayload = {
                typeId: "type-id-123",
                name: "Exam type"
            };

            it("should update the exam type name with the given id", async () => {
                await repository.renameExamType(value);

                expect(prisma.examType.update).toHaveBeenCalledWith({
                    where: { id: value.typeId },
                    data: { name: value.name },
                });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.examType.update.mockRejectedValue(new Error("fail"));

                await expect(repository.renameExamType(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeExamType', () => {
            const value: ExamTypeRemovedEventPayload = { typeId: "type-id-123" };

            it("should update the exam type name with the given id", async () => {
                await repository.removeExamType(value);

                expect(prisma.examType.delete).toHaveBeenCalledWith({
                    where: { id: value.typeId },
                });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.examType.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeExamType(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addExamTypeExternalKey', () => {
            const value: ExamTypeExternalKeyProps = {
                owner: 'owner-id-123',
                typeExamId: 'type-id-123',
                value: 'Test Value'
            };

            it("should create a new exam type external key with correct data", async () => {
                await repository.addExamTypeExternalKey(value);

                expect(prisma.examTypeExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, typeId: value.typeExamId }
                });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.examTypeExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addExamTypeExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addSubtype', () => {
            const value = {} as unknown as ExamSubtype;
            const mapped: Prisma.ExamSubtypeUncheckedCreateInput = {
                name: "Subtype",
                typeId: "type-id-123"
            };

            it("should create a new exam subtype with mapped data", async () => {
                jest.spyOn(ExamSubtypeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addSubtype(value);

                expect(ExamSubtypeDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.examSubtype.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.examSubtype.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(ExamSubtypeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.addSubtype(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeSubtype', () => {
            const value: ExamTypeSubtypeRemovedEventPayload = {
                subtypeId: "subtype-id-123"
            };

            it('should delete the exam subtype by id', async () => {
                await repository.removeSubtype(value);

                expect(prisma.examSubtype.delete).toHaveBeenCalledWith({ where: { id: value.subtypeId } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.examSubtype.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeSubtype(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('moveSubtype', () => {
            const value: ExamTypeSubtypeMovedEventPayload = {
                fromExamType: "exam-type-id-123",
                toExamType: "exam-to-type-id-123",
                subtypeId: "exam-subtype-id-123"
            };

            it('should update the subtype to the new exam type', async () => {
                await repository.moveSubtype(value);

                expect(prisma.examSubtype.update).toHaveBeenCalledWith({
                    where: { id: value.subtypeId },
                    data: { typeId: value.toExamType }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.examSubtype.update.mockRejectedValue(new Error("fail"));

                await expect(repository.moveSubtype(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('renameSubtype', () => {
            const value: ExamSubtypeRenamedEventPayload = {
                subtypeId: 'subtype-id-123',
                subtypeName: 'Subtype'
            };

            it('should update the subtype name with the given id', async () => {
                await repository.renameSubtype(value);

                expect(prisma.examSubtype.update).toHaveBeenCalledWith({
                    where: { id: value.subtypeId },
                    data: { name: value.subtypeName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.examSubtype.update.mockRejectedValue(new Error("fail"));

                await expect(repository.renameSubtype(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addSubtypeExternalKey', () => {
            const value: ExamSubtypeExternalKeyProps = {
                owner: 'owner',
                subtypeExamId: 'subtype-id-123',
                value: 'Subtype-value'
            };

            it('should create a new external key for the subtype', async () => {
                await repository.addSubtypeExternalKey(value);

                expect(prisma.examSubtypeExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, subtypeId: value.subtypeExamId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.examSubtypeExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addSubtypeExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addExam', () => {
            const value = {} as unknown as Exam;
            const mapped: Prisma.ExamUncheckedCreateInput = {
                name: "Subtype",
                subtypeId: "subtype-id-123"
            };

            it('should create a new exam using mapped data', async () => {
                jest.spyOn(ExamDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addExam(value);

                expect(ExamDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.exam.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.exam.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(ExamDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.addExam(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeExam', () => {
            const value: ExamSubtypeExamRemovedEventPayload = { examId: "exam-id-123" };

            it('should delete the exam by id', async () => {
                await repository.removeExam(value);

                expect(prisma.exam.delete).toHaveBeenCalledWith({ where: { id: value.examId } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.exam.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeExam(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('moveExam', () => {
            const value: ExamSubtypeMoveSubtypeEventPayload = {
                fromTypeId: "type-id-123",
                fromSubtypeId: "subtype-id-123",
                toTypeId: "type-id-456",
                toSubtypeId: "subtype-id-456",
                examId: "exam-id-123"
            };

            it('should update the exam to the new subtype', async () => {
                await repository.moveExam(value);

                expect(prisma.exam.update).toHaveBeenCalledWith({
                    where: { id: value.examId },
                    data: { subtypeId: value.toSubtypeId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.exam.update.mockRejectedValue(new Error("fail"));

                await expect(repository.moveExam(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addExamExternalKey', () => {
            const value: ExamExternalKeyProps = {
                owner: 'owner-123',
                examId: 'exam-id-123',
                value: 'exam-value'
            };

            it('should create a new external key for the exam', async () => {
                await repository.addExamExternalKey(value);

                expect(prisma.examExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, examId: value.examId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.examExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addExamExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});