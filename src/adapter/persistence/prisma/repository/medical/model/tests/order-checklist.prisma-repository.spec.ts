import { OrderChecklistModel as PrismaModel } from "@prisma/client";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { OrderChecklistPrismaRepository } from "../order-checklist.prisma-repository";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistModelMapper } from "@omega/adapter/persistence/prisma/mapper/medical/model/order-checklist.model-mapper";

describe('OrderChecklistPrismaRepository', () => {
    let prisma: { orderChecklistModel: any; };
    let repository: OrderChecklistPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            orderChecklistModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderChecklistPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<OrderChecklistPrismaRepository>(OrderChecklistPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<OrderChecklistModel> = { filter: [{ field: 'orderId', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as OrderChecklistModel;

            prisma.orderChecklistModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(OrderChecklistModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.orderChecklistModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.orderChecklistModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderChecklistModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<OrderChecklistModel>[] = [{ field: 'orderId', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as OrderChecklistModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.orderChecklistModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(OrderChecklistModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.orderChecklistModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.orderChecklistModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderChecklistModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});