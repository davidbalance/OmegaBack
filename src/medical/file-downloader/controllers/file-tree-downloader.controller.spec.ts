import { TestBed } from "@automock/jest";
import { FileTreeDownloaderController } from "./file-tree-downloader.controller";
import { FileTreeDownloaderService } from "../services/file-tree-downloader.service";
import { Response } from "express";
import { DownloadTreeRequest } from "../dtos/request/download-tree.dto";

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

    describe('downloadTree', () => {
        const query: DownloadTreeRequest = {};
        const mockStream: any = {
            getStream: jest.fn().mockReturnValue({
                pipe: jest.fn()
            })
        }

        it('should download a file', async () => {
            // Arrange
            service.downloadTree.mockResolvedValueOnce(mockStream);

            // Act
            await controller.downloadTree(query, response as Response);

            // Assert
            expect(service.downloadTree).toHaveBeenCalledWith(query);
            expect(response.setTimeout).toHaveBeenCalled();
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="archivo-medico.zip"',
            });
        });
    });
});