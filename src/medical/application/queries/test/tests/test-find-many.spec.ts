/* eslint-disable @typescript-eslint/unbound-method */
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { ModelRepository } from "@shared/shared/providers";
import { TestFindManyQuery, TestFindManyQueryPayload } from "../test-find-many.query";

describe("TestFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<TestModel>>;
    let handler: TestFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<TestModel>>;

        handler = new TestFindManyQuery(repository);
    });

    it("should return results when valid query is provided", async () => {
        const query: TestFindManyQueryPayload = {
            orderId: "order-123",
        };

        const mockData = [
            { orderId: "order-123", examName: "Blood Test", doctorDni: "1234567890" },
            { orderId: "order-123", examName: "X-Ray", doctorDni: "1234567890" },
        ] as unknown as TestModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { field: "orderId", operator: "eq", value: "order-123" }
            ],
        });
        expect(result).toEqual(mockData);
    });

    it("should apply the examName filter if it's provided in the query", async () => {
        const query: TestFindManyQueryPayload = {
            orderId: "order-123",
            filter: "Blood Test",
        };

        const mockData = [
            { orderId: "order-123", examName: "Blood Test", doctorDni: "1234567890" },
        ] as unknown as TestModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { field: "orderId", operator: "eq", value: "order-123" },
                { field: "examName", operator: "like", value: "Blood Test" },
            ],
        });
        expect(result).toEqual(mockData);
    });

    it("should return an empty array if no results are found", async () => {
        const query: TestFindManyQueryPayload = {
            orderId: "order-123",
        };

        const mockData: TestModel[] = [];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await handler.handleAsync(query);

        expect(result).toEqual(mockData);
    });
});
