/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestRepository as TestAggregateRepository } from "../../../repository/aggregate.repositories";
import { TestConflictError, TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestExternalConnectionRepository, TestInnerRepository } from "@omega/medical/application/repository/model.repositories";
import { TestInnerModel } from "@omega/medical/core/model/test/test-inner.model";
import { TestCreateFromExternalSourceCommand, TestCreateFromExternalSourceCommandPayload } from "../test-create-from-external-source.command";
import { TestExternalKeyConflictError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";

describe("TestCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<TestExternalConnectionRepository>;
    let aggregateRepository: jest.Mocked<TestAggregateRepository>;
    let modelRepository: jest.Mocked<TestInnerRepository>;
    let commandHandler: TestCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        aggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestAggregateRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestInnerRepository>;

        commandHandler = new TestCreateFromExternalSourceCommand(
            externalConnectionRepository,
            aggregateRepository,
            modelRepository
        );
    });

    it("should successfully create a test if there is no external connection and no conflict exists", async () => {
        const mockedTest = {
            id: "test-1",
            addExternalKey: jest.fn()
        } as unknown as Test;
        const spy = jest.spyOn(Test, 'create').mockReturnValue(mockedTest);

        const payload: TestCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        await commandHandler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(spy).toHaveBeenCalledWith(payload);
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(mockedTest.addExternalKey).toHaveBeenCalledWith({ owner: payload.externalKeyOwner, value: payload.externalKeyValue });
        expect(aggregateRepository.saveAsync).toHaveBeenCalledWith(mockedTest);
    });

    it("should reactivate a test if already exists and is not active", async () => {
        const mockedTestModel = { testId: "test-1", isActive: false } as unknown as TestInnerModel;
        const mockedTestAggregate = {
            reactivate: jest.fn(),
            addExternalKey: jest.fn()
        } as unknown as Test;

        const payload: TestCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockedTestModel);
        aggregateRepository.findOneAsync.mockResolvedValue(mockedTestAggregate);
        await commandHandler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: mockedTestModel.testId }] });
        expect(mockedTestAggregate.reactivate).toHaveBeenCalled();
        expect(mockedTestAggregate.addExternalKey).toHaveBeenCalledWith({ owner: payload.externalKeyOwner, value: payload.externalKeyValue });
        expect(aggregateRepository.saveAsync).toHaveBeenCalledWith(mockedTestAggregate);
    });

    it("should throw a TestExternalKeyConflictError if the test not exists", async () => {
        const mockExternalConnection = {} as unknown as TestExternalConnectionModel;

        const payload: TestCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw a TestConflictError if the test not exists", async () => {
        const mockedTestModel = { testId: "test-1", isActive: true } as unknown as TestInnerModel;
        const mockedTestAggregate = { reactivate: jest.fn() } as unknown as Test;

        const payload: TestCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockedTestModel);
        aggregateRepository.findOneAsync.mockResolvedValue(mockedTestAggregate);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw a TestNotFoundError if the test not exists", async () => {
        const mockedTestModel = { testId: "test-1", isActive: false } as unknown as TestInnerModel;

        const payload: TestCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockedTestModel);
        aggregateRepository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'testExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: mockedTestModel.testId }] });
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});
