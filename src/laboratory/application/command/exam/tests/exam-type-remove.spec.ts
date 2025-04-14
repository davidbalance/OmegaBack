/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeProps, ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AggregateRepository } from "@shared/shared/providers";
import { ExamTypeRemoveCommand, ExamTypeRemoveCommandPayload } from "../exam-type-remove.command";

describe("ExamTypeRemoveCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;
    let command: ExamTypeRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;

        command = new ExamTypeRemoveCommand(repository);
    });

    it("should successfully remove the exam type when the exam type exists", async () => {
        const mockExamType = {
            remove: jest.fn(),
        } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValue(mockExamType);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamTypeRemoveCommandPayload = {
            testId: "exam-type-1",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(mockExamType.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when the exam type does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ExamTypeRemoveCommandPayload = {
            testId: "exam-type-1",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
