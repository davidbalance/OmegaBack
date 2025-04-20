import { OrderCloudFileModel as PrismaModel } from "@prisma/client";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { OrderCloudFilePrismaRepository } from "../order-cloud-file.prisma-repository";
import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { OrderCloudFileModelMapper } from "@omega/adapter/persistence/prisma/mapper/medical/model/order-cloud-file.model-mapper";

describe('OrderCloudFilePrismaRepository', () => {
    let prisma: { orderCloudFileModel: any; };
    let repository: OrderCloudFilePrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            orderCloudFileModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderCloudFilePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<OrderCloudFilePrismaRepository>(OrderCloudFilePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<OrderCloudFileModel> = { filter: [{ field: 'orderId', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as OrderCloudFileModel;

            prisma.orderCloudFileModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(OrderCloudFileModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.orderCloudFileModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.orderCloudFileModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderCloudFileModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<OrderCloudFileModel>[] = [{ field: 'orderId', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as OrderCloudFileModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.orderCloudFileModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(OrderCloudFileModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.orderCloudFileModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.orderCloudFileModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.orderCloudFileModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});