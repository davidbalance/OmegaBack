import { ClientJobPositionModel as PrismaModel } from "@prisma/client";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Filter, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ClientJobPositionPrismaRepository } from "../client-job-position.prisma-repository";
import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ClientJobPositionModelMapper } from "@omega/adapter/persistence/prisma/mapper/medical/model/client-job-position.model-mapper";

describe('ClientJobPositionPrismaRepository', () => {
    let prisma: { clientJobPositionModel: any; };
    let repository: ClientJobPositionPrismaRepository;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            clientJobPositionModel: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientJobPositionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ClientJobPositionPrismaRepository>(ClientJobPositionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findManyAsync', () => {
        const mockFilter: SearchCriteria<ClientJobPositionModel> = { filter: [{ field: 'patientDni', operator: 'eq', value: 'value1' }] };
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped values when Prisma returns results', async () => {
            const prismaResults = [{ id: "id-123" }, { id: "id-123" }, { id: "id-123" }] as unknown as PrismaModel[];
            const modelResult = { id: 'id-123' } as unknown as ClientJobPositionModel;

            prisma.clientJobPositionModel.findMany.mockResolvedValue(prismaResults);
            jest.spyOn(ClientJobPositionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findManyAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.clientJobPositionModel.findMany).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toEqual(Array.from({ length: prismaResults.length }).fill(modelResult));
        });

        it('should return empty array when Prisma returns no results', async () => {
            prisma.clientJobPositionModel.findMany.mockResolvedValue([]);

            const result = await repository.findManyAsync(mockFilter);

            expect(result).toEqual([]);
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.clientJobPositionModel.findMany.mockRejectedValue(new Error('DB error'));

            await expect(repository.findManyAsync({ filter: [] })).rejects.toThrow(RepositoryError);
        });
    });

    describe('findOneAsync', () => {
        const mockFilter: Filter<ClientJobPositionModel>[] = [{ field: 'patientDni', operator: 'eq', value: 'value1' }];
        const mockPrismaWhere = { name: 'value1' };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it('should return mapped value when Prisma returns result', async () => {
            const prismaResult = { id: '1' } as unknown as PrismaModel;
            const modelResult = { id: 'id-123' } as unknown as ClientJobPositionModel;

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);
            prisma.clientJobPositionModel.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ClientJobPositionModelMapper, "toModel").mockReturnValue(modelResult);

            const result = await repository.findOneAsync(mockFilter);

            expect(prisma.clientJobPositionModel.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere });
            expect(result).toBe(modelResult);
        });

        it('should return null when Prisma returns null', async () => {
            prisma.clientJobPositionModel.findFirst.mockResolvedValue(null);
            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter);

            const result = await repository.findOneAsync([]);

            expect(result).toBeNull();
        });

        it('should throw RepositoryError when Prisma throws', async () => {
            prisma.clientJobPositionModel.findFirst.mockRejectedValue(new Error('Oops'));

            await expect(repository.findOneAsync([])).rejects.toThrow(RepositoryError);
        });
    });
});