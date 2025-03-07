/* eslint-disable @typescript-eslint/unbound-method */
import { TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindOneQuery } from "../test-find-one.query";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

describe('TestFindOneQuery', () => {
    let repository: jest.Mocked<TestRepository>;
    let queryHandler: TestFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        queryHandler = new TestFindOneQuery(repository);
    });

    it('should return the test model when found', async () => {
        const mockTestModel: TestModel = {
            testId: '123',
            patientName: 'John Doe',
            patientDni: '12345678',
            examName: 'Blood Test',
        } as unknown as TestModel;

        repository.findOneAsync.mockResolvedValue(mockTestModel);

        const result = await queryHandler.handleAsync({ testId: '123' });

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: '123' }]);
        expect(result).toBe(mockTestModel);
    });

    it('should throw TestNotFoundError if the test model is not found', async () => {
        repository.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync({ testId: '123' })).rejects.toThrow(TestNotFoundError);
    });
});