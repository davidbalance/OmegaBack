/* eslint-disable @typescript-eslint/unbound-method */
import { ExamSubtypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype.errors";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ModelRepository } from "@shared/shared/providers";
import { ExamSubtypeFindOneQuery, ExamSubtypeFindOneQueryPayload } from "../exam-subtype-find-one.query";

describe("ExamSubtypeFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<ExamSubtypeModel>>;
    let handler: ExamSubtypeFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ExamSubtypeModel>>;

        handler = new ExamSubtypeFindOneQuery(repository);
    });

    it("should return the correct subtype when a valid subtypeId is provided", async () => {
        const mockSubtype: ExamSubtypeModel = { id: "subtype-1", name: "Subtype 1", typeId: "type-1" } as unknown as ExamSubtypeModel;

        repository.findOneAsync.mockResolvedValue(mockSubtype);

        const query: ExamSubtypeFindOneQueryPayload = { subtypeId: "subtype-1" };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }]);
        expect(result).toEqual(mockSubtype);
    });

    it("should throw ExamSubtypeNotFoundError when no subtype is found for the provided subtypeId", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ExamSubtypeFindOneQueryPayload = { subtypeId: "subtype-1" };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamSubtypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'subtypeId', operator: 'eq', value: query.subtypeId }]);
    });
});
