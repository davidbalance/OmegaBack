/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeProps, ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamCreateCommand, ExamCreateCommandImpl, ExamCreateCommandPayload } from "../exam-create.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";

describe("ExamCreateCommand", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let command: ExamCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        command = new ExamCreateCommandImpl(repository);
    });

    it("should add an exam to the subtype when exam type exists", async () => {
        const mockExamType = {
            addExamToSubtype: jest.fn(),
        } as unknown as ExamType;

        repository.findOneAsync.mockResolvedValue(mockExamType);
        repository.saveAsync.mockResolvedValue();

        const payload: ExamCreateCommandPayload = {
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.typeId }],
        });
        expect(mockExamType.addExamToSubtype).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when exam type does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ExamCreateCommandPayload = {
            typeId: "exam-type-1",
            subtypeId: "exam-1",
            examName: "Test Exam",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(
            new ExamTypeNotFoundError(payload.typeId)
        );

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.typeId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
