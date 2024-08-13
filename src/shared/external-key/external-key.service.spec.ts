import { TestBed } from "@automock/jest";
import { AbstractRepository } from "../sql-database";
import { ExternalKeyEntity } from "./external-key.entity";
import { AbstractExternalKeyService } from "./external-key.service";
import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";

class TestKey extends ExternalKeyEntity {
    public id: number;
}

class MockRepository
    extends AbstractRepository<number, TestKey> {
    findOne = jest.fn();
    create = jest.fn();
    findOneAndDelete = jest.fn();
}

@Injectable()
class TestExternalKeyService
    extends AbstractExternalKeyService<TestKey, MockRepository> {
    constructor(
        @Inject(MockRepository) private readonly _repo: MockRepository
    ) {
        super(_repo);
    }
}


describe('TokenService', () => {
    let service: TestExternalKeyService;
    let repository: jest.Mocked<MockRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(TestExternalKeyService).compile();

        service = unit;
        repository = unitRef.get(MockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockDto = { key: 'key', source: 'source' }
        const mockedExternalKey: TestKey = {
            id: 1,
            source: 'test-source',
            key: 'test-key',
            createAt: new Date(),
            updateAt: new Date()
        };
        const expectResult = mockedExternalKey;

        it('should create a new external key if it does not exist', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(mockedExternalKey);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(repository.create).toHaveBeenCalledWith(mockDto);
            expect(result).toEqual(expectResult);
        });
    });

    describe('remove', () => {
        const key = { source: 'test-source', key: 'test-key' };

        it('should delete the external key if it exists', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValueOnce(undefined);

            // Act
            await service.remove(key);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith(key);
        });

        it('should throw an error if the external key does not exist', async () => {
            // Arrange
            repository.findOneAndDelete.mockRejectedValueOnce(new NotFoundException());

            // Act & Assert
            await expect(service.remove(key)).rejects.toThrowError(NotFoundException);
            expect(repository.findOneAndDelete).toHaveBeenCalledWith(key);
        });
    });
});