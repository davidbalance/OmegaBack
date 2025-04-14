/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeProps, ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AggregateRepository } from "@shared/shared/providers";
import { ExamEditCommand, ExamEditCommandPayload } from "../exam-edit.command";

describe("ExamEditCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;
    let command: ExamEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;

        command = new ExamEditCommand(repository);
    });

    it("should successfully rename an exam in the subtype when the exam type exists", async () => {
        const mockExamType = {
            renameExamInSubtype: jest.fn(),
        } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValue(mockExamType);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamEditCommandPayload = {
            typeId: "exam-type-1",
            examId: "valid-exam-id",
            examName: "blood",
            subtypeId: "subtype-1"
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.typeId }],
        });
        expect(mockExamType.renameExamInSubtype).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when the exam type does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ExamEditCommandPayload = {
            typeId: "exam-type-1",
            examId: "valid-exam-id",
            examName: "blood",
            subtypeId: "subtype-1"
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(
            new ExamTypeNotFoundError(payload.typeId)
        );

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.typeId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
