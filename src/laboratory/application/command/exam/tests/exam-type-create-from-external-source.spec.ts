import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamTypeCreateFromExternalSourceCommand, ExamTypeCreateFromExternalSourceCommandImpl, ExamTypeCreateFromExternalSourceCommandPayload } from "../exam-type-create-from-external-source.command";
import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";

describe("ExamTypeCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<ExamTypeExternalConnectionRepository>;
    let aggregateRepository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamTypeCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalConnectionRepository>;

        aggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamTypeCreateFromExternalSourceCommandImpl(externalConnectionRepository, aggregateRepository);
    });

    it("should successfully create a new exam type and assigning an external key", async () => {
        const payload: ExamTypeCreateFromExternalSourceCommandPayload = {
            name: "NewExamType",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        const mockExamType: ExamType = {
            addExternalKey: jest.fn()
        } as unknown as ExamType

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        aggregateRepository.findOneAsync.mockResolvedValue(null);
        jest.spyOn(ExamType, "create").mockReturnValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'typeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(ExamType.create).toHaveBeenCalledWith(payload);
        expect(mockExamType.addExternalKey).toHaveBeenCalledWith({
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should successfully assign an external key to an existing type", async () => {
        const payload: ExamTypeCreateFromExternalSourceCommandPayload = {
            name: "NewExamType",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        const mockExamType: ExamType = {
            addExternalKey: jest.fn()
        } as unknown as ExamType

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        aggregateRepository.findOneAsync.mockResolvedValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'typeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(mockExamType.addExternalKey).toHaveBeenCalledWith({
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should throw ExamTypeExternalKeyConflictError when the external key already exists", async () => {
        const mockExternalConnection: ExamTypeExternalConnectionModel = {} as unknown as ExamTypeExternalConnectionModel;
        const payload: ExamTypeCreateFromExternalSourceCommandPayload = {
            name: "ExistingExamType",
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value'
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ExamTypeExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'typeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});