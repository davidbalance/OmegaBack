import { Injectable, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { AbstractRepository } from "./abstract.repository";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { TestBed } from "@automock/jest";

class MockEntity extends AbstractEntity<number> {
    public id: number;
}

@Injectable()
class TestRepository extends AbstractRepository<number, MockEntity> {
    constructor(
        @InjectRepository(MockEntity) private readonly repo: Repository<MockEntity>
    ) {
        super(repo);
    }
}

describe('AbstractRepository', () => {
    let service: TestRepository;

    beforeEach(async () => {
        const { unit } = TestBed.create(TestRepository).compile();
        service = unit;
    });

    it('', () => {
        expect(service).toBeDefined();
    });
    /*     let repository: jest.Mocked<Repository<MockEntity>>;
    
        beforeEach(async () => {
            const { unit, unitRef } = TestBed.create(TestRepository).compile();
    
            service = unit;
            repository = unitRef.get(getRepositoryToken(MockEntity).toString()) as unknown as jest.Mocked<Repository<MockEntity>>;
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        describe("create", () => {
            const mockEntity: Partial<MockEntity> = { id: 1 };
            const mockedNewEntity: MockEntity = { id: 1, createAt: new Date(), updateAt: new Date() };
    
            it("should create a new entity", async () => {
                // Arrange
                repository.save.mockResolvedValue(mockedNewEntity);
    
                // Act
                const result = await service.create(mockEntity);
    
                // Assert
                expect(repository.save).toHaveBeenCalledWith(mockEntity);
                expect(result).toEqual(mockedNewEntity);
            });
        });
    
        describe("find", () => {
            const mockOptions: FindManyOptions<MockEntity> = {};
            const mockedEntities: MockEntity[] = [
                { id: 1, createAt: new Date(), updateAt: new Date() },
                { id: 2, createAt: new Date(), updateAt: new Date() },
            ];
    
            it("should find all entities", async () => {
                // Arrange
                repository.find.mockResolvedValue(mockedEntities);
    
                // Act
                const result = await service.find(mockOptions);
    
                // Assert
                expect(repository.find).toHaveBeenCalledWith(mockOptions);
                expect(result).toEqual(mockedEntities);
            });
        });
    
        describe("findOne", () => {
            const mockOptions: FindOneOptions<MockEntity> = { where: { id: 1 } };
            const mockedEntity: MockEntity = { id: 1, createAt: new Date(), updateAt: new Date() };
    
            it("should find one entity", async () => {
                // Arrange
                repository.findOne.mockResolvedValue(mockedEntity);
    
                // Act
                const result = await service.findOne(mockOptions);
    
                // Assert
                expect(repository.findOne).toHaveBeenCalledWith(mockOptions);
                expect(result).toEqual(mockedEntity);
            });
    
            it("should throw NotFoundException if entity not found", async () => {
                // Arrange
                repository.findOne.mockResolvedValue(undefined);
    
                // Act
                try {
                    await service.findOne(mockOptions);
                } catch (error) {
                    // Assert
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.getResponse().message).toEqual(["Entity not found with the given filterOptions"]);
                }
            });
        });
    
        describe("findOneAndUpdate", () => {
            const mockFilterOptions: FindOptionsWhere<MockEntity> = { id: 1 };
            const mockUpdateOptions: Partial<MockEntity> = { id: 2 };
            const mockedEntity: MockEntity = { id: 1, createAt: new Date(), updateAt: new Date() };
            const mockedUpdateEntity: MockEntity = { id: 2, createAt: new Date(), updateAt: new Date() };
    
            it("should find one entity and update it", async () => {
                // Arrange
                repository.findOne.mockResolvedValue(mockedEntity);
                repository.save.mockResolvedValue(mockedUpdateEntity);
    
                // Act
                const result = await service.findOneAndUpdate(mockFilterOptions, mockUpdateOptions);
    
                // Assert
                expect(repository.findOne).toHaveBeenCalledWith({ where: mockFilterOptions });
                expect(repository.save).toHaveBeenCalledWith({ ...mockedEntity, ...mockUpdateOptions });
                expect(result).toEqual(mockedUpdateEntity);
            });
    
            it("should throw NotFoundException if entity not found", async () => {
                // Arrange
                repository.findOne.mockResolvedValue(undefined);
    
                // Act
                try {
                    await service.findOneAndUpdate(mockFilterOptions, mockUpdateOptions);
                } catch (error) {
                    // Assert
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.getResponse().message).toEqual(["Entity not found with the given filterOptions"]);
                }
            });
        });
    
        describe("findOneAndDelete", () => {
            const mockFilterOptions: FindOptionsWhere<MockEntity> = { id: 1 };
    
            it("should find one entity and delete it", async () => {
                // Arrange
                repository.delete.mockResolvedValue(undefined);
    
                // Act
                await service.findOneAndDelete(mockFilterOptions);
    
                // Assert
                expect(repository.delete).toHaveBeenCalledWith(mockFilterOptions);
            });
        }); */
});