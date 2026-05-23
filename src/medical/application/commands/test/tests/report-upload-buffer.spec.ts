/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { FileOperation } from "@shared/shared/providers";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { ReportUploadBufferCommand, ReportUploadBufferCommandImpl } from "../report-upload-buffer.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";

describe("ReportUploadBufferCommand", () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<TestRepository>;
    let filepathRepository: jest.Mocked<ResultFilepathRepository>;
    let handler: ReportUploadBufferCommand;

    beforeEach(() => {
        file = {
            write: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        filepathRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultFilepathRepository>;

        handler = new ReportUploadBufferCommandImpl(file, repository, filepathRepository);
    });

    it("should successfully upload a report and update the test", async () => {
        const testId = "test-1";
        const buffer = Buffer.from("dummy-content");
        const filepath = { patient: "patient-1", order: "order-1", exam: "exam-1" } as unknown as ResultFilepathModel;
        const test = { id: testId, addReportFile: jest.fn() } as unknown as Test;
        const output = "path/to/uploaded/file.pdf";

        filepathRepository.findOneAsync.mockResolvedValue(filepath);
        repository.findOneAsync.mockResolvedValue(test);
        file.write.mockResolvedValue(output);

        await handler.handleAsync({ testId, buffer });

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: testId }]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: testId }] });


        expect(file.write).toHaveBeenCalledWith(
            `medical_report/${filepath.patient}/${filepath.order}`,
            `${filepath.exam.toLocaleLowerCase().replaceAll(/\s/ig, '_')}.pdf`,
            buffer
        );
        expect(test.addReportFile).toHaveBeenCalledWith(output);
        expect(repository.saveAsync).toHaveBeenCalledWith(test);
    });

    it("should throw an error if the filepath is not found", async () => {
        const testId = "test-1";
        const buffer = Buffer.from("dummy-content");

        filepathRepository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync({ testId, buffer })).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: testId }]);
        expect(repository.findOneAsync).not.toHaveBeenCalled();
    });

    it("should throw an error if the test is not found", async () => {
        const testId = "test-1";
        const buffer = Buffer.from("dummy-content");
        const filepath = { patient: "patient-1", order: "order-1", exam: "exam-1" } as unknown as ResultFilepathModel;

        filepathRepository.findOneAsync.mockResolvedValue(filepath);
        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync({ testId, buffer })).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: testId }]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: testId }] });
    });
});