import { TestBed } from "@automock/jest";
import { FileTreeDownloaderController } from "./file-tree-downloader.controller";
import { FileTreeDownloaderService } from "../services/file-tree-downloader.service";
import { Response } from "express";
import { DownloadTreeRequest } from "../dtos/request/download-tree.dto";
import { StreamableFile } from "@nestjs/common";
import { ReadStream } from "typeorm/platform/PlatformTools";

describe('FileTreeDownloaderController', () => {
    let controller: FileTreeDownloaderController;
    let service: jest.Mocked<FileTreeDownloaderService>;
    let response: Partial<Response>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(FileTreeDownloaderController).compile();

        controller = unit;
        service = unitRef.get(FileTreeDownloaderService);
        response = {
            setTimeout: jest.fn(),
            set: jest.fn(),
            pipe: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('startJob', () => {
        const user = 'test@email.com';
        const query: DownloadTreeRequest = {};

        it('should start job', async () => {
            // Arrange
            service.startTreeJob.mockResolvedValueOnce(undefined);

            // Act
            const result = await controller.startJob(user, query);

            // Assert
            expect(service.startTreeJob).toHaveBeenCalledWith(user, query);
            expect(result).toBe("");
        });
    });



    describe('downloadTree', () => {
        const user = 'test@email.com';
        const code = 'test-code';
        const mockStream = {} as ReadStream;

        it('should download a file', async () => {
            // Arrange
            service.downloadTree.mockResolvedValueOnce(mockStream);

            // Act
            const result = await controller.downloadTree(user, code, response as Response);

            // Assert
            expect(service.downloadTree).toHaveBeenCalledWith(user, code);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="file-tree.zip"',
            });
            expect(result).toBeInstanceOf(StreamableFile);
        });
    });
});