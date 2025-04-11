import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeFindOneByExternalKeyQuery, ExamTypeFindOneByExternalKeyQueryPayload } from "../exam-type-find-one-by-external-key.query";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamTypeFindOneQuery } from "../exam-type-find-one.query";

describe("ExamTypeFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamTypeExternalConnectionRepository>;
    let findOneQuery: jest.Mocked<ExamTypeFindOneQuery>;
    let handler: ExamTypeFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalConnectionRepository>;

        findOneQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeFindOneQuery>;

        handler = new ExamTypeFindOneByExternalKeyQuery(externalConnectionRepository, findOneQuery);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { typeId: "order123" } as unknown as ExamTypeExternalConnectionModel;
        const mockType = { typeId: "order123" } as unknown as ExamTypeModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        findOneQuery.handleAsync.mockResolvedValue(mockType);

        const query: ExamTypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(findOneQuery.handleAsync).toHaveBeenCalledWith({ typeId: mockExternalConnection.typeId });
        expect(result).toEqual(mockType);
    });

    it("Should throw ExamTypeExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamTypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamTypeExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(findOneQuery.handleAsync).not.toHaveBeenCalled();
    });
});
