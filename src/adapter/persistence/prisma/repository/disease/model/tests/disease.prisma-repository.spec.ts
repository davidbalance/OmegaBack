import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { DiseasePrismaRepository } from "../disease.prisma-repository";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { DiseaseModel as PrismaModel } from "@prisma/client";
import { DiseaseModelMapper } from "@omega/adapter/persistence/prisma/mapper/disease/model/disease.model-mapper";

describe('DiseasePrismaRepository', () => {
    let prisma;
    let repository: DiseasePrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            diseaseModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                count: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiseasePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<DiseasePrismaRepository>(DiseasePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('countAsync', () => {
        const mockFilter: Filter<DiseaseModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return the count from Prisma', async () => {
            prisma.diseaseModel.count.mockResolvedValue(3);

            const result = await repository.countAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.diseaseModel.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(3);
        });

        it("should throw RepositoryError if Prisma throws", async () => {
            prisma.diseaseModel.count.mockRejectedValue(new Error("DB error"));

            await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<DiseaseModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as DiseaseModel;

            prisma.diseaseModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(DiseaseModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.diseaseModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: {},
                take: undefined,
                skip: undefined,
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.diseaseModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.diseaseModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<DiseaseModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as DiseaseModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.diseaseModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(DiseaseModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.diseaseModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.diseaseModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.diseaseModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});