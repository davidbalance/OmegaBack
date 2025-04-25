import { ExamExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamFindOneByExternalKeyQuery, ExamFindOneByExternalKeyQueryImpl, ExamFindOneByExternalKeyQueryPayload } from "../exam-find-one-by-external-key.query";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";
import { ExamFindOneQuery } from "../exam-find-one.query";

describe("ExamFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<ExamExternalConnectionRepository>;
    let findOneQuery: jest.Mocked<ExamFindOneQuery>;
    let handler: ExamFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamExternalConnectionRepository>;

        findOneQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamFindOneQuery>;

        handler = new ExamFindOneByExternalKeyQueryImpl(externalConnectionRepository, findOneQuery);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { examId: "order123" } as unknown as ExamExternalConnectionModel;
        const mockExam = { examId: "order123" } as unknown as ExamModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        findOneQuery.handleAsync.mockResolvedValue(mockExam);

        const query: ExamFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(findOneQuery.handleAsync).toHaveBeenCalledWith({ examId: mockExternalConnection.examId });
        expect(result).toEqual(mockExam);
    });

    it("Should throw ExamExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: ExamFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ExamExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalOwner', operator: 'eq', value: query.owner },
            { field: 'examExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(findOneQuery.handleAsync).not.toHaveBeenCalled();
    });
});
