import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { TestBed } from "@automock/jest";
import { FileDownloaderService } from "../file-downloader.service";
import { MedicalResultFileManagementService } from "@/medical/medical-result/services/medical-result-file-management.service";
import { MedicalReportFileManagementService } from "@/medical/medical-report/services/medical-report-file-management.service";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { FileSourceEnum } from "../../dtos/request/base.file-source.request.dto";
import { NotFoundException, StreamableFile } from "@nestjs/common";
import { PostDownloadZipRequestDto } from "../../dtos/request/post.download-zip.request.dto";

describe('FileDownloaderService', () => {
    let service: FileDownloaderService;
    let zipper: jest.Mocked<ZipperService>;
    let medicalResultService: jest.Mocked<FileManagementService<number>>;
    let medicalReportService: jest.Mocked<FileManagementService<number>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(FileDownloaderService).compile();

        service = unit;
        zipper = unitRef.get(ZipperService);
        medicalResultService = unitRef.get(MedicalResultFileManagementService);
        medicalReportService = unitRef.get(MedicalReportFileManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('downloadFile', () => {
        const id = 1;
        const mockedStream: StreamableFile = {} as StreamableFile;

        it('should download a report file', async () => {
            // Arrange
            const type: FileSourceEnum = FileSourceEnum.REPORT;
            medicalReportService.getFile.mockResolvedValueOnce(mockedStream);

            // Act
            const result = await service.downloadFile({ id, type });

            // Assert
            expect(result).toEqual(mockedStream);
            expect(medicalReportService.getFile).toHaveBeenCalledWith(id);
        });

        it('should download a result file', async () => {
            // Arrange
            const type: FileSourceEnum = FileSourceEnum.RESULT;
            medicalResultService.getFile.mockResolvedValueOnce(mockedStream);

            // Act
            const result = await service.downloadFile({ id, type });

            // Assert
            expect(result).toEqual(mockedStream);
            expect(medicalResultService.getFile).toHaveBeenCalledWith(id);
        });
    });

    describe('downloadMultipleFiles', () => {
        const files: PostDownloadZipRequestDto = {
            files: [
                { id: 1, type: FileSourceEnum.REPORT },
                { id: 2, type: FileSourceEnum.RESULT }
            ]
        };
        const mockedSources: string[] = ['path/to/report.pdf', 'path/to/result.pdf'];
        const mockedZip: StreamableFile = {} as StreamableFile;

        it('should download multiple files as zip', async () => {
            // Arrange
            medicalReportService.getFilePath.mockResolvedValueOnce(mockedSources[0]);
            medicalResultService.getFilePath.mockResolvedValueOnce(mockedSources[1]);
            zipper.zip.mockResolvedValueOnce(mockedZip);

            // Act
            const result = await service.downloadMultipleFiles(files);

            // Assert
            expect(result).toEqual(mockedZip);
            expect(medicalReportService.getFilePath).toHaveBeenCalledWith(files.files[0].id);
            expect(medicalResultService.getFilePath).toHaveBeenCalledWith(files.files[1].id);
            expect(zipper.zip).toHaveBeenCalledWith(mockedSources);
        });

        it('should throw NotFoundException if no files found', async () => {
            // Arrange
            medicalReportService.getFilePath.mockRejectedValueOnce(new NotFoundException());
            medicalResultService.getFilePath.mockRejectedValueOnce(new NotFoundException());

            // Act
            await expect(service.downloadMultipleFiles(files))
                .rejects
                .toThrowError(NotFoundException);

            // Assert
            expect(medicalReportService.getFilePath).toHaveBeenCalledWith(files.files[0].id);
            expect(medicalResultService.getFilePath).toHaveBeenCalledWith(files.files[1].id);
            expect(zipper.zip).not.toHaveBeenCalled();
        });
    });

    describe('deleteFile', () => {
        const id = 1;
        const type: FileSourceEnum = FileSourceEnum.REPORT;

        it('should delete a file', async () => {
            // Arrange
            medicalReportService.removeFile.mockResolvedValueOnce(true);

            // Act
            await service.deleteFile({ id, type });

            // Assert
            expect(medicalReportService.removeFile).toHaveBeenCalledWith(id);
        });

        it('should throw NotFoundException if file not deleted', async () => {
            // Arrange
            medicalReportService.removeFile.mockResolvedValueOnce(false);

            // Act
            await expect(service.deleteFile({ id, type }))
                .rejects
                .toThrowError(NotFoundException);

            // Assert
            expect(medicalReportService.removeFile).toHaveBeenCalledWith(id);
        });
    });
});