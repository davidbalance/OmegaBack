import { Logger } from "@nestjs/common";
import { ExamSubtypePrismaRepository } from "../exam-subtype.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { ExamSubtypeOptionModel as PrismaModel } from "@prisma/client";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { ExamSubtypeModelMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/model/exam-subtype.model-mapper";
import { RepositoryError } from "@shared/shared/domain/error";

describe('ExamSubtypePrismaRepository', () => {
    let prisma;
    let repository: ExamSubtypePrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examSubtypeModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                count: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamSubtypePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamSubtypePrismaRepository>(ExamSubtypePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('countAsync', () => {
        const mockFilter: Filter<ExamSubtypeModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return the count from Prisma', async () => {
            prisma.examSubtypeModel.count.mockResolvedValue(3);

            const result = await repository.countAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.examSubtypeModel.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(3);
        });

        it("should throw RepositoryError if Prisma throws", async () => {
            prisma.examSubtypeModel.count.mockRejectedValue(new Error("DB error"));

            await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ExamSubtypeModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeModel;

            prisma.examSubtypeModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ExamSubtypeModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examSubtypeModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: mockFilter.order,
                skip: (mockFilter?.skip ?? 0) * (mockFilter?.limit ?? 1),
                take: mockFilter.limit
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.examSubtypeModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ExamSubtypeModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.examSubtypeModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamSubtypeModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.examSubtypeModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.examSubtypeModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});