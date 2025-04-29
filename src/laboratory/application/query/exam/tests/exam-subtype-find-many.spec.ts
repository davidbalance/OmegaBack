/* eslint-disable @typescript-eslint/unbound-method */
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeFindManyQuery, ExamSubtypeFindManyQueryImpl, ExamSubtypeFindManyQueryPayload } from "../exam-subtype-find-many.query";
import { ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";

describe("ExamSubtypeFindManyQuery", () => {
    let repository: jest.Mocked<ExamSubtypeRepository>;
    let handler: ExamSubtypeFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeRepository>;

        handler = new ExamSubtypeFindManyQueryImpl(repository);
    });

    it("should return a list of subtypes when a valid query is provided", async () => {
        const mockSubtypes: ExamSubtypeModel[] = [
            { id: "subtype-1", name: "Subtype 1", typeId: "type-1" },
            { id: "subtype-2", name: "Subtype 2", typeId: "type-1" },
        ] as unknown as ExamSubtypeModel[];
        const mockedCount = 2;

        repository.findManyAsync.mockResolvedValue(mockSubtypes);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamSubtypeFindManyQueryPayload = {
            typeId: "type-1",
            skip: 0,
            limit: 0,
            order: { typeId: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: 'typeId', operator: 'eq', value: query.typeId }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { field: "typeId", operator: "eq", value: query.typeId },
        ]);
        expect(result).toEqual({ data: mockSubtypes, amount: mockedCount });
    });

    it("should return a filtered paginated list when filter is provided", async () => {
        const mockSubtypes: ExamSubtypeModel[] = [
            { id: "subtype-1", name: "Blood Test", typeId: "type-1" },
        ] as unknown as ExamSubtypeModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockSubtypes);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamSubtypeFindManyQueryPayload = {
            typeId: "type-1",
            filter: "Blood",
            skip: 0,
            limit: 10,
            order: { typeId: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { field: "typeId", operator: "eq", value: query.typeId },
                { field: "subtypeName", operator: "like", value: query.filter },
            ],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { field: "typeId", operator: "eq", value: query.typeId },
            { field: "subtypeName", operator: "like", value: query.filter },
        ]);
        expect(result).toEqual({ data: mockSubtypes, amount: mockedCount });
    });

    it("should return an empty list when no subtypes match the provided typeId", async () => {
        const mockedCount = 0;

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: ExamSubtypeFindManyQueryPayload = {
            typeId: "type-1",
            filter: "Nonexistent",
            skip: 0,
            limit: 10,
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { field: "typeId", operator: "eq", value: query.typeId },
                { field: "subtypeName", operator: "like", value: query.filter },
            ],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { field: "typeId", operator: "eq", value: query.typeId },
            { field: "subtypeName", operator: "like", value: query.filter },
        ]);
        expect(result).toEqual({ data: [], amount: mockedCount });
    });
});
