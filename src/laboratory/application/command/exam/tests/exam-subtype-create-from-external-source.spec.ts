/* eslint-disable @typescript-eslint/unbound-method */

import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeCreateFromExternalSourceCommand, ExamSubtypeCreateFromExternalSourceCommandPayload } from "../exam-subtype-create-from-external-source.command";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamSubtypeCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<ExamSubtypeExternalConnectionRepository>;
    let modelRepository: jest.Mocked<ExamSubtypeRepository>;
    let agggregateRepository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamSubtypeCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<ExamSubtypeExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<ExamSubtypeRepository>;

        agggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamSubtypeCreateFromExternalSourceCommand(
            externalConnectionRepository,
            modelRepository,
            agggregateRepository
        );
    });

    it("Should successfully adding a new subtype and assigning an external key", async () => {
        const payload: ExamSubtypeCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeName: "New subtype name"
        };
        const subtypeId = "subtype-789";

        const mockExamType = {
            addSubtype: jest.fn(),
            addExternalKeyToSubtype: jest.fn(),
            subtypes: [{ id: subtypeId }]
        } as unknown as ExamType;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);
        agggregateRepository.findOneAsync.mockResolvedValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeId', operator: 'eq', value: payload.typeId },
            { field: 'subtypeName', operator: 'eq', value: payload.subtypeName },
        ]);
        expect(mockExamType.addSubtype).toHaveBeenCalledWith(payload);
        expect(mockExamType.addExternalKeyToSubtype).toHaveBeenCalledWith({
            subtypeId: subtypeId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("Should successfully assign an external key to an existing subtype", async () => {
        const payload: ExamSubtypeCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeName: "New subtype name"
        };

        const mockCompany: ExamSubtypeModel = { subtypeId: "existing-subtype-456" } as unknown as ExamSubtypeModel;
        const mockExamType = {
            addExternalKeyToSubtype: jest.fn(),
        } as unknown as ExamType;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockCompany);
        agggregateRepository.findOneAsync.mockResolvedValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeId', operator: 'eq', value: payload.typeId },
            { field: 'subtypeName', operator: 'eq', value: payload.subtypeName },
        ]);
        expect(mockExamType.addExternalKeyToSubtype).toHaveBeenCalledWith({
            subtypeId: mockCompany.subtypeId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamSubtypeExternalKeyConflictError if the external key already exists", async () => {
        const mockExternalConnection: ExamSubtypeExternalConnectionModel = {} as unknown as ExamSubtypeExternalConnectionModel;
        const payload: ExamSubtypeCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeName: "New subtype name"
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ExamSubtypeExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw ExamTypeNotFoundError if the corporative does not exist", async () => {
        const payload: ExamSubtypeCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeName: "New subtype name"
        };

        agggregateRepository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});