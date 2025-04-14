/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeProps, ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AggregateRepository } from "@shared/shared/providers";
import { ExamTypeCreateCommand, ExamTypeCreateCommandPayload } from "../exam-type-create.command";
import { ExamTypeConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamTypeCreateCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;
    let command: ExamTypeCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ExamTypeProps, ExamType>>;

        command = new ExamTypeCreateCommand(repository);
    });

    it("should successfully create a new exam type when the name does not already exist", async () => {
        const mockExamType = {} as ExamType;
        const createExamTypeMock = jest.spyOn(ExamType, "create").mockReturnValue(mockExamType);

        repository.findOneAsync.mockResolvedValue(null);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamTypeCreateCommandPayload = {
            name: "New Exam Type",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'name', operator: 'eq', value: payload.name }],
        });
        expect(createExamTypeMock).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeConflictNameError when the exam type with the same name already exists", async () => {
        repository.findOneAsync.mockResolvedValue({} as ExamType);

        const payload: ExamTypeCreateCommandPayload = {
            name: "New Exam Type",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(ExamTypeConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'name', operator: 'eq', value: payload.name }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
