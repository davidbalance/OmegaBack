import { TestBed } from "@automock/jest";
import { StreamableFile } from "@nestjs/common";
import { FileTreeDownloaderService } from "./file-tree-downloader.service";
import { MedicalResultFileTreeService } from "@/medical/medical-result/services/medical-result-file-tree.service";
import { DownloadTreeRequest } from "../dtos/request/download-tree.dto";

describe('FileTreeDownloaderService', () => {
    let service: FileTreeDownloaderService;
    let medicalResultService: jest.Mocked<MedicalResultFileTreeService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(FileTreeDownloaderService).compile();

        service = unit;
        medicalResultService = unitRef.get(MedicalResultFileTreeService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('downloadFile', () => {
        const data: DownloadTreeRequest = {}
        const mockedStream: StreamableFile = {} as StreamableFile;
        const expectedData = mockedStream;

        it('should download a zip file', async () => {
            // Arrange
            medicalResultService.getTree.mockResolvedValueOnce(mockedStream);

            // Act
            const result = await service.downloadTree(data);

            // Assert
            expect(medicalResultService.getTree).toHaveBeenCalledWith(data);
            expect(result).toEqual(expectedData);
        });
    });
});