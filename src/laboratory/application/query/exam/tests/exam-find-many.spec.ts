/* eslint-disable @typescript-eslint/unbound-method */
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ModelRepository } from "@shared/shared/providers";
import { ExamFindManyQuery, ExamFindManyQueryImpl, ExamFindManyQueryPayload } from "../exam-find-many.query";

describe("ExamFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<ExamModel>>;
    let handler: ExamFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ExamModel>>;

        handler = new ExamFindManyQueryImpl(repository);
    });

    it("should return a list of exams when valid query without filter is provided", async () => {
        const mockExams: ExamModel[] = [
            { id: "exam-1", name: "Exam 1", subtypeId: "subtype-1" },
            { id: "exam-2", name: "Exam 2", subtypeId: "subtype-1" },
        ] as unknown as ExamModel[];

        repository.findManyAsync.mockResolvedValue(mockExams);

        const query: ExamFindManyQueryPayload = {
            subtypeId: "subtype-1",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }],
        });
        expect(result).toEqual(mockExams);
    });

    it("should return a list of exams when valid query with examName filter is provided", async () => {
        const mockExams: ExamModel[] = [
            { id: "exam-1", name: "Exam 1", subtypeId: "subtype-1" },
            { id: "exam-2", name: "Exam 2", subtypeId: "subtype-1" },
        ] as unknown as ExamModel[];

        repository.findManyAsync.mockResolvedValue(mockExams);

        const query: ExamFindManyQueryPayload = {
            subtypeId: "subtype-1",
            filter: "Exam"
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { field: 'subtypeId', operator: 'eq', value: query.subtypeId },
                { field: 'examName', operator: 'like', value: query.filter },
            ],
        });
        expect(result).toEqual(mockExams);
    });


    it("should return an empty list when no exams match the provided subtypeId", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const query: ExamFindManyQueryPayload = {
            subtypeId: "subtype-1"
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }],
        });
        expect(result).toEqual([]);
    });
});
