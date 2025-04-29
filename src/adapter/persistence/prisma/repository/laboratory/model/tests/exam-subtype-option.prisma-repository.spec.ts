import { Logger } from "@nestjs/common";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamSubtypeOptionModel as PrismaModel } from "@prisma/client";
import { ExamSubtypeOptionPrismaRepository } from "../exam-subtype-option.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { ExamSubtypeOptionModelMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/model/exam-subtype-option.model-mapper";

describe('ExamSubtypeOptionPrismaRepository', () => {
    let prisma: { examSubtypeOptionModel: any; };
    let repository: ExamSubtypeOptionPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examSubtypeOptionModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamSubtypeOptionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamSubtypeOptionPrismaRepository>(ExamSubtypeOptionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ExamSubtypeOptionModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeOptionModel;

            prisma.examSubtypeOptionModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ExamSubtypeOptionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examSubtypeOptionModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.examSubtypeOptionModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeOptionModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ExamSubtypeOptionModel>[] = [{ field: 'examLabel', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeOptionModel;

            prisma.examSubtypeOptionModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamSubtypeOptionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.examSubtypeOptionModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.examSubtypeOptionModel.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync([]);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeOptionModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});