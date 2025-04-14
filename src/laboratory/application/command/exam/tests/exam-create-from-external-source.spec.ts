/* eslint-disable @typescript-eslint/unbound-method */
import { ExamExternalConnectionRepository, ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamCreateFromExternalSourceCommand, ExamCreateFromExternalSourceCommandPayload } from "../exam-create-from-external-source.command";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<ExamExternalConnectionRepository>;
    let modelRepository: jest.Mocked<ExamRepository>;
    let aggregateRepository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<ExamExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<ExamRepository>;

        aggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamCreateFromExternalSourceCommand(
            externalConnectionRepository,
            modelRepository,
            aggregateRepository
        );
    });

    it("should successfully add a exam to an existing type and assign an external key", async () => {
        const payload: ExamCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };
        const examId = "exam-789";

        const mockExamType = {
            addExamToSubtype: jest.fn(),
            addExternalKeyToExam: jest.fn(),
            subtypes: [{ id: payload.subtypeId, exams: [{ id: examId }] }]
        } as unknown as ExamType;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);
        aggregateRepository.findOneAsync.mockResolvedValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'examExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeId', operator: 'eq', value: payload.subtypeId },
            { field: 'examName', operator: 'eq', value: payload.examName },
        ]);
        expect(mockExamType.addExamToSubtype).toHaveBeenCalledWith(payload);
        expect(mockExamType.addExternalKeyToExam).toHaveBeenCalledWith({
            examId: examId,
            subtypeId: payload.subtypeId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should successfully assign an external key to an existing exam without creating a new one", async () => {
        const payload: ExamCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };

        const mockBranch: ExamModel = { examId: "existing-exam-456" } as unknown as ExamModel;
        const mockExamType = {
            addExternalKeyToExam: jest.fn(),
            addExamToSubtype: jest.fn()
        } as unknown as ExamType;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockBranch);
        aggregateRepository.findOneAsync.mockResolvedValue(mockExamType);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'examExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeId', operator: 'eq', value: payload.subtypeId },
            { field: 'examName', operator: 'eq', value: payload.examName },
        ]);
        expect(mockExamType.addExternalKeyToExam).toHaveBeenCalledWith({
            examId: mockBranch.examId,
            subtypeId: payload.subtypeId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(aggregateRepository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamExternalKeyConflictError if the external key already exists", async () => {
        const mockExternalConnection: ExamExternalConnectionModel = {} as unknown as ExamExternalConnectionModel;
        const payload: ExamCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: "external-owner",
            externalKeyValue: "external-value",
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ExamExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'examExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(aggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw ExamTypeNotFoundError if the type does not exist", async () => {
        const payload: ExamCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };

        aggregateRepository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(aggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.typeId }] });
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});