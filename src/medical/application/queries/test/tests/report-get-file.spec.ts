/* eslint-disable @typescript-eslint/unbound-method */
import { ReportRepository } from "@omega/medical/application/repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { ReportGetFileQuery, ReportGetFileQueryImpl, ReportGetFileQueryPayload } from "../report-get-file.query";
import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

describe('ReportGetFileQuery', () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<ReportRepository>;
    let pdf: jest.Mocked<PdfProvider>;
    let layout: jest.Mock;
    let queryHandler: ReportGetFileQuery;

    beforeEach(() => {
        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ReportRepository>;

        pdf = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<PdfProvider>;

        layout = jest.fn();

        queryHandler = new ReportGetFileQueryImpl(file, repository, pdf, layout);
    });

    it('should return report file from file system if filepath exists', async () => {
        const queryPayload: ReportGetFileQueryPayload = { testId: 'test-id' };

        const mockReport = {
            reportFilepath: 'path/to/report.pdf',
            doctorSignature: 'path/to/signature.png',
            reportContent: 'Report content',
            patientFullname: 'John Doe',
            patientAge: 30,
            patientDni: '12345678',
            locationCompanyName: 'Hospital XYZ',
            examName: 'Exam 1',
            doctorFullname: 'Dr. Smith',
            doctorDni: '87654321',
            reportEmissionDate: new Date(),
        } as unknown as ReportModel;

        const mockFileBuffer = Buffer.from('file content');

        repository.findOneAsync.mockResolvedValue(mockReport);
        file.read.mockResolvedValue(mockFileBuffer);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: queryPayload.testId }]);
        expect(file.read).toHaveBeenCalledWith(mockReport.reportFilepath);
        expect(result).toBe(mockFileBuffer);
    });

    it('should generate a report buffer when no filepath exists', async () => {
        const queryPayload: ReportGetFileQueryPayload = { testId: 'test-id' };

        const mockReport = {
            testId: 'test-id',
            reportFilepath: null,
            doctorSignature: 'path/to/signature.png',
            reportContent: 'Report content',
            patientFullname: 'John Doe',
            patientAge: 30,
            patientDni: '12345678',
            locationCompanyName: 'Hospital XYZ',
            examName: 'Exam 1',
            doctorFullname: 'Dr. Smith',
            doctorDni: '87654321',
            reportEmissionDate: new Date(),
        } as unknown as ReportModel;

        const mockSignatureBuffer = Buffer.from('signature');
        const mockPdfBuffer = Buffer.from('pdf content');

        repository.findOneAsync.mockResolvedValue(mockReport);
        file.read.mockResolvedValue(mockSignatureBuffer);
        layout.mockReturnValue(null);
        pdf.craft.mockResolvedValue(mockPdfBuffer);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: queryPayload.testId }]);
        expect(file.read).toHaveBeenCalledWith(mockReport.doctorSignature);
        expect(pdf.craft).toHaveBeenCalledWith(null);
        expect(result).toBe(mockPdfBuffer);
    });

    it('should throw TestNotFoundError when report is not found', async () => {
        const queryPayload: ReportGetFileQueryPayload = { testId: 'test-id' };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync(queryPayload)).rejects.toThrow(TestNotFoundError);
    });
});
