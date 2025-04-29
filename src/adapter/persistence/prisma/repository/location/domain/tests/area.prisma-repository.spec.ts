import { Logger } from "@nestjs/common";
import { AreaPrismaRepository } from "../area.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { Area, AreaProps } from "@omega/location/core/domain/area/area.domain";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { AreaDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/area.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { AreaIsEvent, AreaRemovedEventPayload, AreaRenamedEventPayload } from "@omega/location/core/domain/area/events/area.event";
import { Prisma } from "@prisma/client";

describe("AreaPrismaRepository", () => {
    let repository: AreaPrismaRepository;
    let prisma: { area: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            area: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AreaPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<AreaPrismaRepository>(AreaPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<AreaProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "area-1" };
            const domainResult = { id: "area-1" };

            prisma.area.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(AreaDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.area.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere, });
            expect(AreaDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.area.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.area.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Area => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Area);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(AreaIsEvent, "isAreaRenamedEvent").mockReturnValue(false);
            jest.spyOn(AreaIsEvent, "isAreaRemovedEvent").mockReturnValue(false);
        });

        it("should call createArea when event is AreaCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "AreaCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createArea").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call renameArea when event is AreaRenamedEvent", async () => {
            const payload = { areaId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "AreaPasswordEditedEvent", value: payload });

            jest.spyOn(AreaIsEvent, "isAreaRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameArea").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeArea when event is AreaApikeyAddedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "AreaApikeyAddedEvent", value: payload });

            jest.spyOn(AreaIsEvent, "isAreaRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeArea").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createArea", () => {
            const value = {} as unknown as Area;
            const mapped: Prisma.AreaUncheckedCreateInput = {
                name: "Area"
            };

            it('should create a new area using the mapped domain data', async () => {
                jest.spyOn(AreaDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createArea(value);

                expect(AreaDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.area.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.area.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(AreaDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createArea(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("renameArea", () => {
            const value: AreaRenamedEventPayload = {
                areaId: "area-id-123",
                areaName: "Area"
            };

            it('should update the area name with the given id', async () => {
                await repository.renameArea(value);

                expect(prisma.area.update).toHaveBeenCalledWith({
                    where: { id: value.areaId },
                    data: { name: value.areaName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.area.update.mockRejectedValue(new Error("fail"));

                await expect(repository.renameArea(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeArea", () => {
            const value: AreaRemovedEventPayload = {
                areaId: "area-id-123"
            };

            it('should delete the area by id', async () => {
                await repository.removeArea(value);

                expect(prisma.area.delete).toHaveBeenCalledWith({
                    where: { id: value.areaId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.area.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeArea(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});