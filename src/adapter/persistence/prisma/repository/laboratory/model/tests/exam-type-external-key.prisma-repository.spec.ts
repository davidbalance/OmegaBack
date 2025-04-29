import { Test, TestingModule } from "@nestjs/testing";
import { ExamTypeExternalConnectionModel as PrismaModel } from "@prisma/client";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamTypeExternalConnectionPrismaRepository } from "../exam-type-external-key.prisma-repository";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalConnectionModelMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/model/exam-type-external-connection.model-mapper";

describe('ExamTypeExternalConnectionPrismaRepository', () => {
    let prisma: { examTypeExternalConnectionModel: any; };
    let repository: ExamTypeExternalConnectionPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examTypeExternalConnectionModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamTypeExternalConnectionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamTypeExternalConnectionPrismaRepository>(ExamTypeExternalConnectionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ExamTypeExternalConnectionModel> = { filter: [{ field: 'typeId', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ExamTypeExternalConnectionModel;

            prisma.examTypeExternalConnectionModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ExamTypeExternalConnectionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examTypeExternalConnectionModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: mockFilter.order,
                skip: (mockFilter?.skip ?? 0) * (mockFilter?.limit ?? 1),
                take: mockFilter.limit
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.examTypeExternalConnectionModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examTypeExternalConnectionModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ExamTypeExternalConnectionModel>[] = [{ field: 'typeId', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ExamTypeExternalConnectionModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.examTypeExternalConnectionModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamTypeExternalConnectionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.examTypeExternalConnectionModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.examTypeExternalConnectionModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examTypeExternalConnectionModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});