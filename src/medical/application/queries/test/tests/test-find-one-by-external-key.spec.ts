/* eslint-disable @typescript-eslint/unbound-method */
import { TestExternalConnectionRepository, TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestFindOneByExternalKeyQuery, TestFindOneByExternalKeyQueryPayload } from "../test-find-one-by-external-key.query";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";

describe("TestFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<TestExternalConnectionRepository>;
    let modelRepository: jest.Mocked<TestRepository>;
    let handler: TestFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new TestFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { testId: "order123" } as unknown as TestExternalConnectionModel;
        const mockTest = { testId: "order123", patientName: "John Doe", status: "pending" } as unknown as TestModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockTest);

        const query: TestFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testId', operator: 'eq', value: mockExternalConnection.testId }
        ]);
        expect(result).toEqual(mockTest);
    });

    it("Should throw TestExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: TestFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw TestNotFoundError when the external key exists but the order does not", async () => {
        const mockExternalConnection = { testId: "order123" } as unknown as TestExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: TestFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testId', operator: 'eq', value: mockExternalConnection.testId }
        ]);
    });
});