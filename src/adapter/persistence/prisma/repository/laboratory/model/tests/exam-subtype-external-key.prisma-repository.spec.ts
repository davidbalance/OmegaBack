import { Test, TestingModule } from "@nestjs/testing";
import { ExamSubtypeExternalConnectionModel as PrismaModel } from "@prisma/client";
import { ExamSubtypeExternalConnectionPrismaRepository } from "../exam-subtype-external-key.prisma-repository";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { ExamSubtypeExternalConnectionModelMapper } from "@omega/adapter/persistence/prisma/mapper/laboratory/model/exam-subtype-external-connection.model-mapper";
import { RepositoryError } from "@shared/shared/domain/error";

describe('ExamSubtypeExternalConnectionPrismaRepository', () => {
    let prisma: { examSubtypeExternalConnectionModel: any; };
    let repository: ExamSubtypeExternalConnectionPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            examSubtypeExternalConnectionModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamSubtypeExternalConnectionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ExamSubtypeExternalConnectionPrismaRepository>(ExamSubtypeExternalConnectionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ExamSubtypeExternalConnectionModel> = { filter: [{ field: 'typeId', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeExternalConnectionModel;

            prisma.examSubtypeExternalConnectionModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ExamSubtypeExternalConnectionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.examSubtypeExternalConnectionModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: mockFilter.order,
                skip: (mockFilter?.skip ?? 0) * (mockFilter?.limit ?? 1),
                take: mockFilter.limit
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.examSubtypeExternalConnectionModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeExternalConnectionModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ExamSubtypeExternalConnectionModel>[] = [{ field: 'typeId', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ExamSubtypeExternalConnectionModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.examSubtypeExternalConnectionModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ExamSubtypeExternalConnectionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.examSubtypeExternalConnectionModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.examSubtypeExternalConnectionModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.examSubtypeExternalConnectionModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});