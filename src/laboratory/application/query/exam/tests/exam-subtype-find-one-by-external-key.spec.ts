import { ExamSubtypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeFindOneByExternalKeyQuery, ExamSubtypeFindOneByExternalKeyQueryPayload } from "../exam-subtype-find-one-by-external-key.query";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";
import { ExamSubtypeFindOneQuery } from "../exam-subtype-find-one.query";

describe("ExamSubtypeFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamSubtypeExternalConnectionRepository>;
    let fidnOneQuery: jest.Mocked<ExamSubtypeFindOneQuery>;
    let handler: ExamSubtypeFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalConnectionRepository>;

        fidnOneQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeFindOneQuery>;

        handler = new ExamSubtypeFindOneByExternalKeyQuery(externalConnectionRepository, fidnOneQuery);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { subtypeId: "order123" } as unknown as ExamSubtypeExternalConnectionModel;
        const mockExam = { subtypeId: "order123" } as unknown as ExamSubtypeModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        fidnOneQuery.handleAsync.mockResolvedValue(mockExam);

        const query: ExamSubtypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(fidnOneQuery.handleAsync).toHaveBeenCalledWith({ subtypeId: mockExternalConnection.subtypeId });
        expect(result).toEqual(mockExam);
    });

    it("Should throw ExamSubtypeExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamSubtypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamSubtypeExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(fidnOneQuery.handleAsync).not.toHaveBeenCalled();
    });
});
