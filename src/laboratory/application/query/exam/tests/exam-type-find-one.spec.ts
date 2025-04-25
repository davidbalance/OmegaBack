/* eslint-disable @typescript-eslint/unbound-method */
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeFindOneQuery, ExamTypeFindOneQueryImpl, ExamTypeFindOneQueryPayload } from "../exam-type-find-one.query";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";

describe("ExamTypeFindOneQuery", () => {
    let repository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamTypeFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamTypeFindOneQueryImpl(repository);
    });

    it("should return the correct exam type when a valid typeId is provided", async () => {
        const mockExamType: ExamTypeModel = { id: "type-1", name: "Exam Type 1" } as unknown as ExamTypeModel;

        repository.findOneAsync.mockResolvedValue(mockExamType);

        const query: ExamTypeFindOneQueryPayload = { typeId: "type-1" };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'typeId', operator: 'eq', value: query.typeId }]);
        expect(result).toEqual(mockExamType);
    });

    it("should throw ExamTypeNotFoundError when no exam type is found for the provided typeId", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ExamTypeFindOneQueryPayload = { typeId: "type-1" };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamTypeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'typeId', operator: 'eq', value: query.typeId }]);
    });
});
