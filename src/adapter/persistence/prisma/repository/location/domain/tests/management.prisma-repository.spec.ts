import { Logger } from "@nestjs/common";
import { ManagementPrismaRepository } from "../management.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Management, ManagementProps } from "@omega/location/core/domain/management/management.domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { ManagementDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/management.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ManagementIsEvent, ManagementRemovedEventPayload, ManagementRenamedEventPayload } from "@omega/location/core/domain/management/events/management.event";
import { Prisma } from "@prisma/client";

describe("ManagementPrismaRepository", () => {
    let repository: ManagementPrismaRepository;
    let prisma: { management: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            management: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ManagementPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ManagementPrismaRepository>(ManagementPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<ManagementProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "management-1" };
            const domainResult = { id: "management-1" };

            prisma.management.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ManagementDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.management.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere, });
            expect(ManagementDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.management.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.management.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Management => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Management);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(ManagementIsEvent, "isManagementRenamedEvent").mockReturnValue(false);
            jest.spyOn(ManagementIsEvent, "isManagementRemovedEvent").mockReturnValue(false);
        });

        it("should call createManagement when event is ManagementCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "ManagementCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createManagement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call renameManagement when event is ManagementRenamedEvent", async () => {
            const payload = { managementId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ManagementPasswordEditedEvent", value: payload });

            jest.spyOn(ManagementIsEvent, "isManagementRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameManagement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeManagement when event is ManagementApikeyAddedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "ManagementApikeyAddedEvent", value: payload });

            jest.spyOn(ManagementIsEvent, "isManagementRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeManagement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createManagement", () => {
            const value = {} as unknown as Management;
            const mapped: Prisma.ManagementUncheckedCreateInput = {
                name: "Management"
            };

            it('should create a new management using the mapped domain data', async () => {
                jest.spyOn(ManagementDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createManagement(value);

                expect(ManagementDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.management.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.management.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(ManagementDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createManagement(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("renameManagement", () => {
            const value: ManagementRenamedEventPayload = {
                managementId: "management-id-123",
                managementName: "Management"
            };

            it('should update the management name with the given id', async () => {
                await repository.renameManagement(value);

                expect(prisma.management.update).toHaveBeenCalledWith({
                    where: { id: value.managementId },
                    data: { name: value.managementName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.management.update.mockRejectedValue(new Error("fail"));

                await expect(repository.renameManagement(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeManagement", () => {
            const value: ManagementRemovedEventPayload = {
                managementId: "management-id-123"
            };

            it('should delete the management by id', async () => {
                await repository.removeManagement(value);

                expect(prisma.management.delete).toHaveBeenCalledWith({
                    where: { id: value.managementId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.management.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeManagement(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});