/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeEditCommand, ExamTypeEditCommandImpl, ExamTypeEditCommandPayload } from "../exam-type-edit.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";

describe("ExamTypeEditCommand", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let command: ExamTypeEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        command = new ExamTypeEditCommandImpl(repository);
    });

    it("should successfully edit the exam type name when the exam type exists", async () => {
        const mockExamType = {
            rename: jest.fn(),
        } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValue(mockExamType);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamTypeEditCommandPayload = {
            testId: "exam-type-1",
            testName: "Updated Exam Type",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(mockExamType.rename).toHaveBeenCalledWith(payload.testName);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when the exam type does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ExamTypeEditCommandPayload = {
            testId: "exam-type-1",
            testName: "Updated Exam Type",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
