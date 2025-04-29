/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamSubtypeMoveCommand, ExamSubtypeMoveCommandImpl, ExamSubtypeMoveCommandPayload } from "../exam-subtype-move.command";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamSubtypeMoveCommand", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let command: ExamSubtypeMoveCommand;

    beforeEach(() => {
        repository = { findOneAsync: jest.fn(), saveAsync: jest.fn() } as unknown as jest.Mocked<ExamTypeRepository>;
        command = new ExamSubtypeMoveCommandImpl(repository);
    });

    it("should successfully move subtype from one exam type to another", async () => {
        const payload: ExamSubtypeMoveCommandPayload = {
            fromTypeId: "from-type-id",
            toTypeId: "to-type-id",
            subtypeId: "subtype-id",
        };

        const fromType = { id: "from-type-id", moveSubtypeTo: jest.fn() } as unknown as ExamType;
        const toType = { id: "to-type-id" } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValueOnce(fromType).mockResolvedValueOnce(toType);
        repository.saveAsync.mockResolvedValue(undefined);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
        expect(fromType.moveSubtypeTo).toHaveBeenCalledWith(toType, payload.subtypeId);
        expect(repository.saveAsync).toHaveBeenCalledWith(fromType);
    });

    it("should throw ExamTypeNotFoundError when from exam type is not found", async () => {
        const payload: ExamSubtypeMoveCommandPayload = {
            fromTypeId: "non-existing-type-id",
            toTypeId: "to-type-id",
            subtypeId: "subtype-id",
        };

        repository.findOneAsync.mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).not.toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
    });

    it("should throw ExamTypeNotFoundError when to exam type is not found", async () => {
        const payload: ExamSubtypeMoveCommandPayload = {
            fromTypeId: "from-type-id",
            toTypeId: "non-existing-type-id",
            subtypeId: "subtype-id",
        };

        const fromType = { id: "from-type-id", moveSubtypeTo: jest.fn() } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValueOnce(fromType).mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromTypeId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toTypeId }] });
    });
});
