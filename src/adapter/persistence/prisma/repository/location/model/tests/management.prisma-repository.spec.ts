import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ExamSubtypeOptionModel as PrismaModel } from "@prisma/client";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { RepositoryError } from "@shared/shared/domain/error";
import { ManagementPrismaRepository } from "../management.prisma-repository";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementModelMapper } from "@omega/adapter/persistence/prisma/mapper/location/model/management.model-mapper";

describe('ManagementPrismaRepository', () => {
    let prisma;
    let repository: ManagementPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            managementModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                count: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ManagementPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ManagementPrismaRepository>(ManagementPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('countAsync', () => {
        const mockFilter: Filter<ManagementModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return the count from Prisma', async () => {
            prisma.managementModel.count.mockResolvedValue(3);

            const result = await repository.countAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            expect(prisma.managementModel.count).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(3);
        });

        it("should throw RepositoryError if Prisma throws", async () => {
            prisma.managementModel.count.mockRejectedValue(new Error("DB error"));

            await expect(repository.countAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ManagementModel> = { filter: [] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ManagementModel;

            prisma.managementModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ManagementModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.managementModel.findMany).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                orderBy: { ...mockFilter.order }
            });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.managementModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.managementModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ManagementModel>[] = [];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ManagementModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.managementModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ManagementModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.managementModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.managementModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.managementModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});