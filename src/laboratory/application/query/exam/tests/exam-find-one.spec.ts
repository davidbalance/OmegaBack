/* eslint-disable @typescript-eslint/unbound-method */
import { ExamNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam.errors";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ModelRepository } from "@shared/shared/providers";
import { ExamFindOneQuery, ExamFindOneQueryPayload } from "../exam-find-one.query";

describe("ExamFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<ExamModel>>;
    let handler: ExamFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ExamModel>>;

        handler = new ExamFindOneQuery(repository);
    });

    it("should return the exam when the exam exists", async () => {
        const mockExam: ExamModel = {
            id: "exam-1",
            name: "Exam 1",
            subtypeId: "subtype-1",
        } as unknown as ExamModel;

        repository.findOneAsync.mockResolvedValue(mockExam);

        const query: ExamFindOneQueryPayload = {
            examId: "exam-1",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examId', operator: 'eq', value: query.examId },
        ]);
        expect(result).toEqual(mockExam);
    });

    it("should throw ExamNotFoundError when the exam does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ExamFindOneQueryPayload = {
            examId: "exam-1",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examId', operator: 'eq', value: query.examId },
        ]);
    });
});
