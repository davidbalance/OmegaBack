import { Logger } from "@nestjs/common";
import { ResourcePrismaRepository } from "../resource.prisma-respository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { Resource, ResourceProps } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceDomainMapper } from "@omega/adapter/persistence/prisma/mapper/auth/domain/resource.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ResourceIsEvent, ResourceRemovedEventPayload } from "@omega/auth/core/domain/resource/events/resource.events";
import { Prisma } from "@prisma/client";

describe("ResourcePrismaRepository", () => {
    let repository: ResourcePrismaRepository;
    let prisma: { resource: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            resource: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ResourcePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ResourcePrismaRepository>(ResourcePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<ResourceProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "resource-1" };
            const domainResult = { id: "resource-1" };

            prisma.resource.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ResourceDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.resource.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere, });
            expect(ResourceDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.resource.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.resource.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Resource => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Resource);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(ResourceIsEvent, "isResourceEditedEvent").mockReturnValue(false);
            jest.spyOn(ResourceIsEvent, "isResourceRemovedEvent").mockReturnValue(false);
        });

        it("should call createResource when event is ResourceCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "ResourceCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createResource").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call editResource when event is ResourceEditedEvent", async () => {
            const payload = { resourceId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ResourcePasswordEditedEvent", value: payload });

            jest.spyOn(ResourceIsEvent, "isResourceEditedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editResource").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeResource when event is ResourceApikeyAddedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "ResourceApikeyAddedEvent", value: payload });

            jest.spyOn(ResourceIsEvent, "isResourceRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeResource").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createResource", () => {
            const value = {} as unknown as Resource;
            const mapped: Prisma.ResourceUncheckedCreateInput = {
                label: "Resource Label",
                address: "/path/to/file",
                icon: "resource-icon"
            };

            it("should create a new aggregate using the mapped Prisma data", async () => {
                jest.spyOn(ResourceDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createResource(value);

                expect(ResourceDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.resource.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.resource.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(ResourceDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createResource(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("editResource", () => {
            const value = {
                id: "",
                order: "",
                label: "Resource Label",
                address: "/path/to/file",
                icon: "resource-icon"
            } as unknown as Resource;

            it("should update the password for the given resourceId", async () => {
                await repository.editResource(value);

                expect(prisma.resource.update).toHaveBeenCalledWith({
                    where: { id: value.id },
                    data: {
                        address: value.address,
                        icon: value.icon,
                        label: value.label,
                        order: value.order
                    }
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.resource.update.mockRejectedValue(new Error("fail"));

                await expect(repository.editResource(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeResource", () => {
            const value: ResourceRemovedEventPayload = {
                resourceId: "resource-id-123"
            };

            it("should delete the password for the given resourceId", async () => {
                await repository.removeResource(value);

                expect(prisma.resource.delete).toHaveBeenCalledWith({
                    where: { id: value.resourceId }
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.resource.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeResource(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});