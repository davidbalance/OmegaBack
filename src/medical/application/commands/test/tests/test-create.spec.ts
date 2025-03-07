/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestRepository as TestAggregateRepository } from "../../../repository/aggregate.repositories";
import { TestRepository as TestModelRepository } from "../../../repository/model.repositories";
import { TestCreateCommand, TestCreateCommandPayload } from "../test-create.command";
import { TestConflictError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestModel } from "@omega/medical/core/model/test/test.model";

describe("TestCreateCommand", () => {
    let repository: jest.Mocked<TestAggregateRepository>;
    let model: jest.Mocked<TestModelRepository>;
    let commandHandler: TestCreateCommand;

    beforeEach(() => {
        repository = {
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestAggregateRepository>;

        model = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestModelRepository>;

        commandHandler = new TestCreateCommand(repository, model);
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
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedTest);
    });

    it("should throw a TestConflictError if the test already exists", async () => {
        const mockedTest = { id: "test-1" } as unknown as TestModel;

        const payload: TestCreateCommandPayload = {
            orderId: "order-1",
            examName: "exam-1",
            examSubtype: "subtype-1",
            examType: "type-1",
        };

        model.findOneAsync.mockResolvedValue(mockedTest);
        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestConflictError);

        expect(model.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: payload.orderId },
            { field: 'examName', operator: 'eq', value: payload.examName },
            { field: 'examSubtype', operator: 'eq', value: payload.examSubtype },
            { field: 'examType', operator: 'eq', value: payload.examType },
        ]);
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
