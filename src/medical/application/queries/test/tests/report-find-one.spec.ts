/* eslint-disable @typescript-eslint/unbound-method */
import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportFindOneQuery, ReportFindOneQueryImpl, ReportFindOneQueryPayload } from "../report-find-one.query";
import { ReportRepository } from "@omega/medical/application/repository/model.repositories";
import { ReportNotFoundError } from "@omega/medical/core/domain/test/errors/report.errors";

describe("ReportFindOneQuery", () => {
    let repository: jest.Mocked<ReportRepository>;
    let handler: ReportFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ReportRepository>;

        handler = new ReportFindOneQueryImpl(repository);
    });

    it("should return an report model when the report exists", async () => {
        const mockReport: ReportModel = { orderId: "order123", patientName: "John Doe", status: "pending" } as unknown as ReportModel;

        repository.findOneAsync.mockResolvedValue(mockReport);

        const query: ReportFindOneQueryPayload = { testId: "test123" };
        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: query.testId }]);
        expect(result).toEqual(mockReport);
    });

    it("should throw an ReportNotFoundError when the report does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ReportFindOneQueryPayload = { testId: "test123" };
        await expect(handler.handleAsync(query)).rejects.toThrow(ReportNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: query.testId }]);
    });
});
