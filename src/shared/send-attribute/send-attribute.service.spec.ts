import { Inject, Injectable } from "@nestjs/common";
import { AbstractSendAttributeEntity } from "./send-attribute.entity";
import { AbstractSendAttributeService } from "./send-attribute.service";
import { TestBed } from "@automock/jest";
import { AbstractRepository } from "../sql-database/abstract.repository";

class MockEntity extends AbstractSendAttributeEntity {
    public id: number;
}

class MockRespository extends AbstractRepository<number, MockEntity> { }

@Injectable()
class TestSendAttributeService extends AbstractSendAttributeService<MockEntity, MockRespository> {
    constructor(
        @Inject(MockRespository) private readonly repo: MockRespository
    ) {
        super(repo);
    }
}

describe('AbstractSendAttributeService', () => {
    let service: TestSendAttributeService;
    let repository: jest.Mocked<MockRespository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(TestSendAttributeService).compile();

        service = unit;
        repository = unitRef.get(MockRespository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedDto = { value: 'test-value' };
        const mockedSendAttribute: MockEntity = {
            id: 1,
            value: "mocked-send-attribute",
            createAt: new Date(),
            updateAt: new Date()
        }
        const expectResult = mockedSendAttribute;

        it('should create a send attribute', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(mockedSendAttribute);

            // Act
            const result = await service.create(mockedDto);

            // Assert
            expect(repository.create).toHaveBeenCalledWith(mockedDto);
            expect(result).toEqual(expectResult);
        });
    })
});