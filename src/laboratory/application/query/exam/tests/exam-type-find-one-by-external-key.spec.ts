import { ExamTypeExternalConnectionRepository, ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeFindOneByExternalKeyQuery, ExamTypeFindOneByExternalKeyQueryPayload } from "../exam-type-find-one-by-external-key.query";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

describe("ExamTypeFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamTypeExternalConnectionRepository>;
    let modelRepository: jest.Mocked<ExamTypeRepository>;
    let handler: ExamTypeFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeRepository>;

        handler = new ExamTypeFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { typeId: "order123" } as unknown as ExamTypeExternalConnectionModel;
        const mockType = { typeId: "order123" } as unknown as ExamTypeModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockType);

        const query: ExamTypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeId', operator: 'eq', value: mockExternalConnection.typeId }
        ]);
        expect(result).toEqual(mockType);
    });

    it("Should throw ExamTypeExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamTypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamTypeExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw ExamTypeNotFoundError when the external key exists but the order does not", async () => {
        const mockExternalConnection = { typeId: "order123" } as unknown as ExamTypeExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamTypeFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamTypeNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'typeExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeId', operator: 'eq', value: mockExternalConnection.typeId }
        ]);
    });
});
