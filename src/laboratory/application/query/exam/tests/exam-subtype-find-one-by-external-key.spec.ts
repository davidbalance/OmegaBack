import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeFindOneByExternalKeyQuery, ExamSubtypeFindOneByExternalKeyQueryPayload } from "../exam-subtype-find-one-by-external-key.query";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";
import { ExamSubtypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype.errors";

describe("ExamSubtypeFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamSubtypeExternalConnectionRepository>;
    let modelRepository: jest.Mocked<ExamSubtypeRepository>;
    let handler: ExamSubtypeFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeRepository>;

        handler = new ExamSubtypeFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { subtypeId: "order123" } as unknown as ExamSubtypeExternalConnectionModel;
        const mockExam = { subtypeId: "order123" } as unknown as ExamSubtypeModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockExam);

        const query: ExamSubtypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeId', operator: 'eq', value: mockExternalConnection.subtypeId }
        ]);
        expect(result).toEqual(mockExam);
    });

    it("Should throw ExamSubtypeExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamSubtypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamSubtypeExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw ExamSubtypeNotFoundError when the external key exists but the order does not", async () => {
        const mockExternalConnection = { subtypeId: "order123" } as unknown as ExamSubtypeExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamSubtypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamSubtypeNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'subtypeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeId', operator: 'eq', value: mockExternalConnection.subtypeId }
        ]);
    });
});
