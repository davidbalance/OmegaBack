import { ExamExternalConnectionRepository, ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamFindOneByExternalKeyQuery, ExamFindOneByExternalKeyQueryPayload } from "../exam-find-one-by-external-key.query";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam.errors";
import { ExamExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";

describe("ExamFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamExternalConnectionRepository>;
    let modelRepository: jest.Mocked<ExamRepository>;
    let handler: ExamFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamRepository>;

        handler = new ExamFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { examId: "order123" } as unknown as ExamExternalConnectionModel;
        const mockExam = { examId: "order123" } as unknown as ExamModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockExam);

        const query: ExamFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examId', operator: 'eq', value: mockExternalConnection.examId }
        ]);
        expect(result).toEqual(mockExam);
    });

    it("Should throw ExamExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw ExamNotFoundError when the external key exists but the order does not", async () => {
        const mockExternalConnection = { examId: "order123" } as unknown as ExamExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examId', operator: 'eq', value: mockExternalConnection.examId }
        ]);
    });
});
