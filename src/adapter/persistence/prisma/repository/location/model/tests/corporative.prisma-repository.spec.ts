import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ExamSubtypeOptionModel as PrismaModel } from "@prisma/client";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { RepositoryError } from "@shared/shared/domain/error";
import { CorporativePrismaRepository } from "../corporative.prisma-repository";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeModelMapper } from "@omega/adapter/persistence/prisma/mapper/location/model/corporative.model-mapper";

describe('CorporativePrismaRepository', () => {
    let prisma;
    let repository: CorporativePrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            corporativeModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                count: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CorporativePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<CorporativePrismaRepository>(CorporativePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('countAsync', () => {
        const mockFilter: Filter<CorporativeModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return the count from Prisma', async () => {
            prisma.corporativeModel.count.mockResolvedValue(3);

            const result = await repository.countAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.corporativeModel.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(3);
        });

        it("should throw RepositoryError if Prisma throws", async () => {
            prisma.corporativeModel.count.mockRejectedValue(new Error("DB error"));

            await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<CorporativeModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as CorporativeModel;

            prisma.corporativeModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(CorporativeModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.corporativeModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: mockFilter.order,
                skip: (mockFilter?.skip ?? 0) * (mockFilter?.limit ?? 1),
                take: mockFilter.limit
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.corporativeModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.corporativeModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<CorporativeModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as CorporativeModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.corporativeModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(CorporativeModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.corporativeModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.corporativeModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.corporativeModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});