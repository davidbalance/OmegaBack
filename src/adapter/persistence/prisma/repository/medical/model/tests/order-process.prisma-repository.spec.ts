import { OrderProcessModel as PrismaModel } from "@prisma/client";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { OrderProcessPrismaRepository } from "../order-process.prisma-repository";
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";
import { OrderProcessModelMapper } from "@omega/adapter/persistence/prisma/mapper/medical/model/order-process.model-mapper";

describe('OrderProcessPrismaRepository', () => {
    let prisma: { orderProcessModel: any; };
    let repository: OrderProcessPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            orderProcessModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderProcessPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<OrderProcessPrismaRepository>(OrderProcessPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<OrderProcessModel> = { filter: [{ field: 'orderProcess', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as OrderProcessModel;

            prisma.orderProcessModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(OrderProcessModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.orderProcessModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.orderProcessModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderProcessModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<OrderProcessModel>[] = [{ field: 'orderProcess', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as OrderProcessModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.orderProcessModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(OrderProcessModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.orderProcessModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.orderProcessModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderProcessModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});