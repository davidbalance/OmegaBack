import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { DiseaseGroupModelMapper } from "@omega/adapter/persistence/prisma/mapper/disease/model/disease-group.model-mapper";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupModel as PrismaModel } from "@prisma/client";
import { DiseaseGroupPrismaRepository } from "../disease-group.prisma-repository";
import { RepositoryError } from "@shared/shared/domain/error";

describe('DiseaseGroupPrismaRepository', () => {
    let prisma;
    let repository: DiseaseGroupPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            diseaseGroupModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                count: jest.fn(),
            },
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

    describe('countAsync', () => {
        const mockFilter: Filter<DiseaseGroupModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return the count from Prisma', async () => {
            prisma.diseaseGroupModel.count.mockResolvedValue(3);

            const result = await repository.countAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.diseaseGroupModel.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(3);
        });

        it("should throw RepositoryError if Prisma throws", async () => {
            prisma.diseaseGroupModel.count.mockRejectedValue(new Error("DB error"));

            await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<DiseaseGroupModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as DiseaseGroupModel;

            prisma.diseaseGroupModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(DiseaseGroupModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.diseaseGroupModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: {},
                take: undefined,
                skip: undefined,
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.diseaseGroupModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.diseaseGroupModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<DiseaseGroupModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as DiseaseGroupModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.diseaseGroupModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(DiseaseGroupModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.diseaseGroupModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.diseaseGroupModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.diseaseGroupModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});