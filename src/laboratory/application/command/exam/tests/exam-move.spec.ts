/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamMoveCommand, ExamMoveCommandImpl, ExamMoveCommandPayload } from "../exam-move.command";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamMoveCommand", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let command: ExamMoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<ExamTypeRepository>;
        command = new ExamMoveCommandImpl(repository);
    });

    it("should successfully move exam from one exam type to another", async () => {
        const payload: ExamMoveCommandPayload = {
            fromTypeId: "from-type-id",
            fromSubtypeId: "from-subtype-id",
            toTypeId: "to-type-id",
            toSubtypeId: "to-subtype-id",
            examId: "exam-id",
        };

        const fromType = { id: "from-type-id", moveExamTo: jest.fn() } as unknown as ExamType;
        const toType = { id: "to-type-id" } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValueOnce(fromType).mockResolvedValueOnce(toType);

        repository.saveAsync.mockResolvedValue(undefined);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
        expect(fromType.moveExamTo).toHaveBeenCalledWith(toType, payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(fromType);
    });

    it("should throw ExamTypeNotFoundError when from exam type is not found", async () => {
        const payload: ExamMoveCommandPayload = {
            fromTypeId: "from-type-id",
            fromSubtypeId: "from-subtype-id",
            toTypeId: "to-type-id",
            toSubtypeId: "to-subtype-id",
            examId: "exam-id",
        };

        repository.findOneAsync.mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).not.toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
    });

    it("should throw ExamTypeNotFoundError when to exam type is not found", async () => {
        const payload: ExamMoveCommandPayload = {
            fromTypeId: "from-type-id",
            fromSubtypeId: "from-subtype-id",
            toTypeId: "to-type-id",
            toSubtypeId: "to-subtype-id",
            examId: "exam-id",
        };

        const fromType = { id: "from-type-id", moveExamTo: jest.fn() } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValueOnce(fromType).mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(new ExamTypeNotFoundError(payload.toTypeId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
    });
});
