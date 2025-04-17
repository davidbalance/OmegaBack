import { Logger } from "@nestjs/common";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamTypeOptionModel as PrismaModel } from "@prisma/client";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { ExamTypeOptionPrismaRepository } from "../exam-type-option.prisma-repository";
import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeOptionModelMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/model/exam-type-option.model-mapper";

describe('ExamTypeOptionPrismaRepository', () => {
    let prisma: { examTypeOptionModel: any; };
    let repository: ExamTypeOptionPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examTypeOptionModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamTypeOptionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamTypeOptionPrismaRepository>(ExamTypeOptionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ExamTypeOptionModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ExamTypeOptionModel;

            prisma.examTypeOptionModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ExamTypeOptionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examTypeOptionModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.examTypeOptionModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examTypeOptionModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ExamTypeOptionModel>[] = [{ field: 'typeLabel', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ExamTypeOptionModel;

            prisma.examTypeOptionModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamTypeOptionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.examTypeOptionModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.examTypeOptionModel.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync([]);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examTypeOptionModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});