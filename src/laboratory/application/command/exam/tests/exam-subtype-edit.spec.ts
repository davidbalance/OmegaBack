/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamSubtypeEditCommand, ExamSubtypeEditCommandImpl, ExamSubtypeEditCommandPayload } from "../exam-subtype-edit.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";

describe("ExamSubtypeEditCommand", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let command: ExamSubtypeEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        command = new ExamSubtypeEditCommandImpl(repository);
    });

    it("should successfully rename a subtype in the exam type when the exam type exists", async () => {
        const mockExamType = {
            renameSubtype: jest.fn(),
        } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValue(mockExamType);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamSubtypeEditCommandPayload = {
            typeId: "exam-type-1",
            subtypeId: "valid-subtype-id",
            subtypeName: "New name"
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.typeId }],
        });
        expect(mockExamType.renameSubtype).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when the exam type does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ExamSubtypeEditCommandPayload = {
            typeId: "exam-type-1",
            subtypeId: "valid-subtype-id",
            subtypeName: "New name"
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.typeId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
