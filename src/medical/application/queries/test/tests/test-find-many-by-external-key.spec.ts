/* eslint-disable @typescript-eslint/unbound-method */
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestFindManyByExternalKeyQuery, TestFindManyByExternalKeyQueryImpl, TestFindManyByExternalKeyQueryPayload } from "../test-find-many-by-external-key.query";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { TestFindManyQuery } from "../test-find-many.query";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

describe("TestFindManyByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<OrderExternalConnectionRepository>;
    let testQuery: jest.Mocked<TestFindManyQuery>;
    let handler: TestFindManyByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        testQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<TestFindManyQuery>;

        handler = new TestFindManyByExternalKeyQueryImpl(externalConnectionRepository, testQuery);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { orderId: "order123" } as unknown as OrderExternalConnectionModel;
        const mockTest: TestModel[] = [
            { testId: "test123" },
            { testId: "test456" },
            { testId: "test789" }
        ] as unknown as TestModel[];

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        testQuery.handleAsync.mockResolvedValue(mockTest);

        const query: TestFindManyByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(testQuery.handleAsync).toHaveBeenCalledWith({ orderId: mockExternalConnection.orderId });
        expect(result).toEqual(mockTest);
    });

    it("Should throw OrderExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: TestFindManyByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(OrderExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(testQuery.handleAsync).not.toHaveBeenCalled();
    });
});