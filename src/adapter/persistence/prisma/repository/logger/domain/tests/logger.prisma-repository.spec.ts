import { Test, TestingModule } from "@nestjs/testing";
import { LoggerPrismaRepository } from "../logger.prisma-repository";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { LoggerModel, LoggerModelProps } from "@db-logger/db-logger/core/model/logger.model";
import { AggregateEvent, Filter, SearchCriteria } from "@shared/shared/domain";
import { LoggerLevelModelMapper } from "@omega/adapter/persistence/prisma/mapper/logger/model/logger-level.model-mapper";
import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { RepositoryError } from "@shared/shared/domain/error";
import { Logger as LocalLogger } from "@db-logger/db-logger/core/domain/logger.domain";
import { LoggerDomainMapper } from "@omega/adapter/persistence/prisma/mapper/logger/domain/logger.domain-mapper";
import { Prisma } from "@prisma/client";

describe("LoggerPrismaRepository", () => {
    let repository: LoggerPrismaRepository;
    let prisma: { logger: { findMany: jest.Mock<any, any, any>; count: jest.Mock<any, any, any>; create: jest.Mock<any, any, any>; }; loggerLevelModel: { findMany: jest.Mock<any, any, any>; }; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            logger: {
                findMany: jest.fn(),
                count: jest.fn(),
                create: jest.fn(),
            },
            loggerLevelModel: {
                findMany: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoggerPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<LoggerPrismaRepository>(LoggerPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('retriveLevels', () => {
        it('should return a list of logger levels mapped to domain models', async () => {
            const length: number = 5;
            const prismaResult = Array.from({ length }).fill({ level: "level-sample" }) as unknown as { level: string }[];
            const modelResult = { level: "level-sample" } as unknown as LoggerLevelModel;

            prisma.loggerLevelModel.findMany.mockResolvedValue(prismaResult);
            jest.spyOn(LoggerLevelModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.retriveLevels();

            expect(prisma.loggerLevelModel.findMany).toHaveBeenCalled();
            expect(LoggerLevelModelMapper.toModel).toHaveBeenCalledTimes(length);
            expect(LoggerLevelModelMapper.toModel).toHaveBeenCalledWith(prismaResult[0]);
            expect(result).toEqual(Array.from({ length }).fill(modelResult));
        });

        it('should throw RepositoryError when Prisma throws an exception', async () => {
            const error = new Error("DB connection failed");
            prisma.loggerLevelModel.findMany.mockRejectedValue(error);

            await expect(repository.retriveLevels()).rejects.toThrow(RepositoryError);
        });
    });

    describe('write', () => {
        const createFakeAggregate = (event: any): LocalLogger => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as LocalLogger);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
        });

        it('should call createLogger when a created event is present in the aggregate', async () => {
            const aggregate = createFakeAggregate({ key: "AggregatedCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createLogger").mockResolvedValue();

            await repository.write(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

    });

    describe('read', () => {
        const mockFilter: SearchCriteria<LoggerModelProps> = { filter: [{ field: "level", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return a list of logger entries matching the given filter, mapped to domain models', async () => {
            const length: number = 5;
            const prismaResult = Array.from({ length }).fill({ id: "logger-id-123" }) as unknown as { level: string }[];
            const modelResult = { id: "logger-id-123" } as unknown as LoggerModel;

            prisma.logger.findMany.mockResolvedValue(prismaResult);
            jest.spyOn(LoggerDomainMapper, "toDomain").mockReturnValue(modelResult as any);

            const result = await repository.read(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.logger.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                skip: (mockFilter?.skip ?? 0) * (mockFilter?.limit ?? 1),
                take: mockFilter.limit
            });
            expect(LoggerDomainMapper.toDomain).toHaveBeenCalledTimes(length);
            expect(LoggerDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult[0]);
            expect(result).toEqual(Array.from({ length }).fill(modelResult));
        });

        it('should throw RepositoryError when Prisma throws an exception', async () => {
            const error = new Error("DB connection failed");
            prisma.logger.findMany.mockRejectedValue(error);

            await expect(repository.read(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('countAsync', () => {
        describe('countAsync', () => {
            const mockFilter: Filter<LoggerModel>[] = [];
            const mockPrismaWhere = { name: 'value1' };

            beforeEach(() => {
                jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
            });

            it('should return the count of logger entries matching the given filter', async () => {
                prisma.logger.count.mockResolvedValue(3);

                const result = await repository.countAsync(mockFilter);

                expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
                expect(prisma.logger.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
                expect(result).toBe(3);
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.logger.count.mockRejectedValue(new Error("DB error"));

                await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
            });
        });
    });

    describe('createLogger', () => {
        const value = {} as unknown as LocalLogger;
        const mapped: Prisma.LoggerUncheckedCreateInput = {
            level: "warn",
            message: "Test message..."
        };

        it('should create a new logger entry using the mapped domain data', async () => {
            jest.spyOn(LoggerDomainMapper, "toPrisma").mockReturnValue(mapped);

            await repository.createLogger(value);

            expect(LoggerDomainMapper.toPrisma).toHaveBeenCalledWith(value);
            expect(prisma.logger.create).toHaveBeenCalledWith({ data: mapped });
        });

        it('should throw RepositoryError when Prisma throws an exception', async () => {
            prisma.logger.create.mockRejectedValue(new Error("fail"));

            jest.spyOn(LoggerDomainMapper, "toPrisma").mockReturnValue(mapped);

            await expect(repository.createLogger(value)).rejects.toThrow(RepositoryError);
        });

    });

});