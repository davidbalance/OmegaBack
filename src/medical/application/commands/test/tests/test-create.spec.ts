/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestRepository as TestAggregateRepository } from "../../../repository/aggregate.repositories";
import { TestCreateCommand, TestCreateCommandImpl, TestCreateCommandPayload } from "../test-create.command";
import { TestConflictError, TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestInnerRepository } from "@omega/medical/application/repository/model.repositories";
import { TestInnerModel } from "@omega/medical/core/model/test/test-inner.model";

describe("TestCreateCommand", () => {
    let repository: jest.Mocked<TestAggregateRepository>;
    let model: jest.Mocked<TestInnerRepository>;
    let commandHandler: TestCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestAggregateRepository>;

        model = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestInnerRepository>;

        commandHandler = new TestCreateCommandImpl(repository, model);
    });

    it("should successfully create a test if no conflict exists", async () => {
        const mockedTest = { id: "test-1" } as unknown as Test;
        const spy = jest.spyOn(Test, 'create').mockReturnValue(mockedTest);

        const payload: TestCreateCommandPayload = {
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        model.findOneAsync.mockResolvedValue(null);

        await commandHandler.handleAsync(payload);

        expect(model.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(spy).toHaveBeenCalledWith(payload);
        expect(repository.findOneAsync).not.toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedTest);
    });

    it("should reactivate a test if already exists and is not active", async () => {
        const mockedTestModel = { testId: "test-1", isActive: false } as unknown as TestInnerModel;
        const mockedTestAggregate = { reactivate: jest.fn() } as unknown as Test;

        const payload: TestCreateCommandPayload = {
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        model.findOneAsync.mockResolvedValue(mockedTestModel);
        repository.findOneAsync.mockResolvedValue(mockedTestAggregate);
        await commandHandler.handleAsync(payload);

        expect(model.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: mockedTestModel.testId }] });
        expect(mockedTestAggregate.reactivate).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedTestAggregate);
    });


    it("should throw a TestConflictError if the test not exists", async () => {
        const mockedTestModel = { testId: "test-1", isActive: true } as unknown as TestInnerModel;
        const mockedTestAggregate = { reactivate: jest.fn() } as unknown as Test;

        const payload: TestCreateCommandPayload = {
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        model.findOneAsync.mockResolvedValue(mockedTestModel);
        repository.findOneAsync.mockResolvedValue(mockedTestAggregate);
        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestConflictError);

        expect(model.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(repository.findOneAsync).not.toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: mockedTestModel.testId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw a TestNotFoundError if the test not exists", async () => {
        const mockedTestModel = { testId: "test-1", isActive: false } as unknown as TestInnerModel;

        const payload: TestCreateCommandPayload = {
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        model.findOneAsync.mockResolvedValue(mockedTestModel);
        repository.findOneAsync.mockResolvedValue(null);
        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(model.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: mockedTestModel.testId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
