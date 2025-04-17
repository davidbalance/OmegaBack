import { Logger } from "@nestjs/common";
import { DiseaseGroupPrismaRepository } from "../disease-group.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { DiseaseGroup, DiseaseGroupProps } from "@omega/disease/core/domain/disease-group.domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { DiseaseGroupDomainMapper } from "@omega/adapter/persistence/prisma/mapper/disease/domain/disease-group.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { DiseaseGroupDiseaseMovedEventPayload, DiseaseGroupDiseaseRemovedEventPayload, DiseaseGroupIsEvent, DiseaseGroupRemovedEventPayload, DiseaseGroupRenamedEventPayload } from "@omega/disease/core/domain/events/disease-group.events";
import { DiseaseIsEvent, DiseaseRenamedEventPayload } from "@omega/disease/core/domain/events/disease.events";
import { Prisma } from "@prisma/client";
import { Disease } from "@omega/disease/core/domain/disease.domain";
import { DiseaseDomainMapper } from "@omega/adapter/persistence/prisma/mapper/disease/domain/disease.domain-mapper";

describe("DiseaseGroupPrismaRepository", () => {
    let repository: DiseaseGroupPrismaRepository;
    let prisma: { diseaseGroup: any; disease: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            diseaseGroup: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            },
            disease: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn()
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiseaseGroupPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<DiseaseGroupPrismaRepository>(DiseaseGroupPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<DiseaseGroupProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { id: "test-id-123" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "diseaseGroup-1" };
            const domainResult = { id: "diseaseGroup-1" };

            prisma.diseaseGroup.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(DiseaseGroupDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.diseaseGroup.findFirst).toHaveBeenCalledWith({
                include: { diseases: true },
                where: mockPrismaWhere,
            });
            expect(DiseaseGroupDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.diseaseGroup.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.diseaseGroup.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): DiseaseGroup => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as DiseaseGroup);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupRenamedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupRemovedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseAddedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseRemovedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseMovedEvent").mockReturnValue(false);
            jest.spyOn(DiseaseIsEvent, "isDiseaseRenamedEvent").mockReturnValue(false);
        });

        it("should call createDiseaseGroup when event is DiseaseGroupCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "DiseaseGroupCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createDiseaseGroup").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call renameDiseaseGroup when event is DiseaseGroupRenamedEvent", async () => {
            const payload = { diseaseGroupId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "DiseaseGroupRenamedEvent", value: payload });

            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameDiseaseGroup").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeDiseaseGroup when event is DiseaseGroupRemovedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "DiseaseGroupRemovedEvent", value: payload });

            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeDiseaseGroup").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addDisease when event is DiseaseGroupDiseaseAddedEvent", async () => {
            const payload = { id: "token-1" };
            const aggregate = createFakeAggregate({ key: "DiseaseGroupDiseaseAddedEvent", value: payload });

            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addDisease").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeDisease when event is DiseaseGroupDiseaseRemovedEvent", async () => {
            const payload = { tokenId: "token-1" };
            const aggregate = createFakeAggregate({ key: "DiseaseGroupDiseaseRemovedEvent", value: payload });

            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeDisease").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call moveDisease when event is DiseaseGroupDiseaseMovedEvent", async () => {
            const payload = { diseaseGroupId: "diseaseGroup-1", resourceId: "resource-1" };
            const aggregate = createFakeAggregate({ key: "DiseaseGroupDiseaseMovedEvent", value: payload });

            jest.spyOn(DiseaseGroupIsEvent, "isDiseaseGroupDiseaseMovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "moveDisease").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call renameDisease when event is DiseaseRenamedEvent", async () => {
            const payload = { diseaseGroupId: "diseaseGroup-1", resourceId: "resource-1" };
            const aggregate = createFakeAggregate({ key: "DiseaseRenamedEvent", value: payload });

            jest.spyOn(DiseaseIsEvent, "isDiseaseRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameDisease").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createDiseaseGroup", () => {
            const value = {} as unknown as DiseaseGroup;
            const mapped: Prisma.DiseaseGroupUncheckedCreateInput = {
                name: "Test disease group"
            };

            beforeEach(() => {
                jest.spyOn(DiseaseGroupDomainMapper, "toPrisma").mockReturnValue(mapped);
            });

            it("should create a new aggregate using the mapped Prisma data", async () => {

                await repository.createDiseaseGroup(value);

                expect(DiseaseGroupDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.diseaseGroup.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.diseaseGroup.create.mockRejectedValue(new Error("fail"));

                await expect(repository.createDiseaseGroup(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("renameDiseaseGroup", () => {
            const value: DiseaseGroupRenamedEventPayload = {
                groupId: 'group-id-123',
                name: 'Disease Group'
            };

            it("should update the disease group name", async () => {
                await repository.renameDiseaseGroup(value);

                expect(prisma.diseaseGroup.update).toHaveBeenCalledWith({
                    where: { id: value.groupId },
                    data: { name: value.name },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.diseaseGroup.update.mockRejectedValue(new Error("DB Error"));

                await expect(repository.renameDiseaseGroup(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeDiseaseGroup", () => {
            const value: DiseaseGroupRemovedEventPayload = {
                groupId: "group-id-123"
            };

            it("should delete the disease group by ID", async () => {
                await repository.removeDiseaseGroup(value);

                expect(prisma.diseaseGroup.delete).toHaveBeenCalledWith({
                    where: { id: value.groupId },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.diseaseGroup.delete.mockRejectedValue(new Error("DB error"));

                await expect(repository.removeDiseaseGroup(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("addDisease", () => {
            const disease = {} as unknown as Disease;
            const mapped: Prisma.DiseaseUncheckedCreateInput = {
                name: "Disease",
                groupId: "group-id-123"
            };

            beforeEach(() => {
                jest.spyOn(DiseaseDomainMapper, "toPrisma").mockReturnValue(mapped);
            });

            it("should map the disease and call prisma.disease.create with correct data", async () => {
                await repository.addDisease(disease);

                expect(DiseaseDomainMapper.toPrisma).toHaveBeenCalledWith(disease);
                expect(prisma.disease.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.disease.create.mockRejectedValue(new Error("DB error"));

                await expect(repository.addDisease(disease)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeDisease", () => {
            const value: DiseaseGroupDiseaseRemovedEventPayload = {
                diseaseId: "disease-123"
            };

            it("should call prisma.disease.delete with correct diseaseId", async () => {
                await repository.removeDisease(value);

                expect(prisma.disease.delete).toHaveBeenCalledWith({
                    where: { id: value.diseaseId }
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.disease.delete.mockRejectedValue(new Error("DB error"));

                await expect(repository.removeDisease(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("moveDisease", () => {
            const value: DiseaseGroupDiseaseMovedEventPayload = {
                diseaseId: 'disease-id-123',
                targetId: 'target-id-123'
            };

            it("should call prisma.disease.update with correct data", async () => {
                await repository.moveDisease(value);

                expect(prisma.disease.update).toHaveBeenCalledWith({
                    where: { id: value.diseaseId },
                    data: { groupId: value.targetId }
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.disease.update.mockRejectedValue(new Error("Something bad happened"));

                await expect(repository.moveDisease(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("renameDisease", () => {
            const value: DiseaseRenamedEventPayload = {
                diseaseId: 'disease-id-123',
                diseaseName: 'New disease name'
            };

            it("should call prisma.disease.update with correct data", async () => {
                await repository.renameDisease(value);

                expect(prisma.disease.update).toHaveBeenCalledWith({
                    where: { id: value.diseaseId },
                    data: { name: value.diseaseName }
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.disease.update.mockRejectedValue(new Error("Unexpected failure"));

                await expect(repository.renameDisease(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});