import { Logger } from "@nestjs/common";
import { IncrementPrismaRepository } from "../increment.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../../prisma.service";
import { IncrementDomainMapper } from "../../../mapper/increment/increment.mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { AggregateEvent } from "@shared/shared/domain";
import { IncrementDomain } from "@local-increment/local-increment/domain/increment.domain";
import { IncrementIsEvent, IncrementNextEventPayload } from "@local-increment/local-increment/event/increment.event";
import { Prisma } from "@prisma/client";

describe("IncrementPrismaRepository", () => {
    let repository: IncrementPrismaRepository;
    let prisma: { increment: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            increment: {
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IncrementPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<IncrementPrismaRepository>(IncrementPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOne', () => {
        const mockFilter: string = 'id-key-123';

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "increment-1" };
            const domainResult = { id: "increment-1" };

            prisma.increment.findUnique.mockResolvedValue(prismaResult);
            jest.spyOn(IncrementDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOne(mockFilter);

            expect(prisma.increment.findUnique).toHaveBeenCalledWith({
                where: { key: mockFilter },
            });
            expect(IncrementDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.increment.findUnique.mockResolvedValue(null);

            const result = await repository.findOne(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.increment.findUnique.mockRejectedValue(error);

            await expect(repository.findOne(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): IncrementDomain => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as IncrementDomain);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(IncrementIsEvent, "isIncrementNextEvent").mockReturnValue(false);
        });

        it("should call createIncrement when event is IncrementDomainCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "IncrementDomainCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createIncrement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call createIncrement when event is IncrementDomainCreatedEvent", async () => {
            const payload: IncrementNextEventPayload = {
                incrementCount: 5,
                incrementId: 'id-123'
            };
            const aggregate = createFakeAggregate({ key: "IncrementDomainCreatedEvent", value: payload });

            jest.spyOn(IncrementIsEvent, "isIncrementNextEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "updateIncrement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createIncrement", () => {
            const value = {} as unknown as IncrementDomain;
            const mapped: Prisma.IncrementUncheckedCreateInput = {
                key: "key-123"
            };

            it("should call Prisma create with mapped domain data", async () => {
                jest.spyOn(IncrementDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createIncrement(value);

                expect(IncrementDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.increment.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.increment.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(IncrementDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createIncrement(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("updateIncrement", () => {
            const value: IncrementNextEventPayload = {
                incrementCount: 5,
                incrementId: 'id-123'
            };

            it("should call Prisma update with correct id and count", async () => {
                await repository.updateIncrement(value);

                expect(prisma.increment.update).toHaveBeenCalledWith({
                    where: { id: value.incrementId },
                    data: { count: value.incrementCount }
                });
            });

            it("should throw RepositoryError when Prisma throws an exception", async () => {
                prisma.increment.update.mockRejectedValue(new Error("fail"));

                await expect(repository.updateIncrement(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});