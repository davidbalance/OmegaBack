/* eslint-disable @typescript-eslint/unbound-method */
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFileResultCountQuery, TestFileResultCountQueryImpl } from "../test-file-result-count.query";

describe('TestFileResultCountQuery', () => {
    let repository: jest.Mocked<TestFileResultRepository>;
    let queryHandler: TestFileResultCountQuery;

    beforeEach(() => {
        repository = {
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<TestFileResultRepository>;

        queryHandler = new TestFileResultCountQueryImpl(repository);
    });

    it('should return correct count for tests with and without files', async () => {
        const mockFoundCount = 10;
        const mockNotFoundCount = 5;

        repository.countAsync.mockResolvedValueOnce(mockFoundCount);
        repository.countAsync.mockResolvedValueOnce(mockNotFoundCount);

        const result = await queryHandler.handleAsync();

        expect(result.total).toBe(mockFoundCount + mockNotFoundCount);
        expect(result.found).toBe(mockFoundCount);
        expect(result.notFound).toBe(mockNotFoundCount);
        expect(repository.countAsync).toHaveBeenCalledTimes(2);
        expect(repository.countAsync).toHaveBeenCalledWith([{ field: 'resultHasFile', operator: 'eq', value: true }]);
        expect(repository.countAsync).toHaveBeenCalledWith([{ field: 'resultHasFile', operator: 'eq', value: false }]);
    });
});
