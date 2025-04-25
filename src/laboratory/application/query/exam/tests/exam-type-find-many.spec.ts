/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeFindManyQuery, ExamTypeFindManyQueryImpl, ExamTypeFindManyQueryPayload } from "../exam-type-find-many.query";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";

describe("ExamTypeFindManyQuery", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamTypeFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamTypeFindManyQueryImpl(repository);
    });

    it("should return a list of exam types when valid query parameters are provided", async () => {
        const mockedExamTypes: ExamTypeModel[] = [
            { id: "type-1", name: "Exam Type 1" },
            { id: "type-2", name: "Exam Type 2" },
        ] as unknown as ExamTypeModel[];
        const mockedCount = 2;

        repository.findManyAsync.mockResolvedValue(mockedExamTypes);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamTypeFindManyQueryPayload = {
            skip: 1,
            limit: 10,
            order: { typeName: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({ ...query, filter: [], });
        expect(repository.countAsync).toHaveBeenCalledWith([]);
        expect(result).toEqual({ data: mockedExamTypes, amount: mockedCount });
    });

    it("should return a filtered list of exam types when filter is applied", async () => {
        const mockedExamTypes: ExamTypeModel[] = [{ id: "type-1", name: "Blood Test" }] as unknown as ExamTypeModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockedExamTypes);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamTypeFindManyQueryPayload = {
            filter: "Blood",
            skip: 0,
            limit: 10,
            order: { typeId: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: "typeName", operator: "like", value: query.filter }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { field: "typeName", operator: "like", value: query.filter },
        ]);
        expect(result).toEqual({ data: mockedExamTypes, amount: mockedCount });
    });

    it("should return an empty list when no exam types are found", async () => {
        const mockedCount = 0;

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamTypeFindManyQueryPayload = {
            filter: "Nonexistent",
            skip: 0,
            limit: 10,
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: "typeName", operator: "like", value: query.filter }],
        });

        expect(repository.countAsync).toHaveBeenCalledWith([
            { field: "typeName", operator: "like", value: query.filter },
        ]);

        expect(result).toEqual({ data: [], amount: mockedCount });
    });
});
