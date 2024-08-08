import { TestBed } from "@automock/jest";
import { FileDownloaderService } from "../services/file-downloader.service";
import { FileDownloaderController } from "./file-downloader.controller";
import { PostFileSourceRequestDto } from "../dtos/request/post.file-source.request.dto";
import { FileSourceEnum } from "../dtos/request/base.file-source.request.dto";
import { Response } from "express";
import { PostDownloadZipRequestDto } from "../dtos/request/post.download-zip.request.dto";

describe('FileDownloaderController', () => {
    let controller: FileDownloaderController;
    let service: jest.Mocked<FileDownloaderService>;
    let response: Partial<Response>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(FileDownloaderController).compile();

        controller = unit;
        service = unitRef.get(FileDownloaderService);
        response = {
            set: jest.fn(),
            pipe: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getFile', () => {
        const body: PostFileSourceRequestDto = {
            type: FileSourceEnum.REPORT,
            id: 0
        };
        const mockStream: any = {
            getStream: jest.fn().mockReturnValue({
                pipe: jest.fn()
            })
        }

        it('should download a file', async () => {
            // Arrange
            service.downloadFile.mockResolvedValueOnce(mockStream);

            // Act
            await controller.getFile(body, response as Response);

            // Assert
            expect(service.downloadFile).toHaveBeenCalledWith(body);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="archivo-medico.pdf"',
            });
            expect(mockStream.getStream).toHaveBeenCalled();
            expect(mockStream.getStream().pipe).toHaveBeenCalledWith(response);
        });
    });

    describe('getZip', () => {
        const body: PostDownloadZipRequestDto = {
            files: [{ id: 1, type: FileSourceEnum.REPORT }, { id: 2, type: FileSourceEnum.RESULT }]
        };
        const mockedZip: any = {
            getStream: jest.fn().mockReturnValue({
                pipe: jest.fn()
            })
        }

        it('should download multiple files as zip', async () => {
            // Arrange
            service.downloadMultipleFiles.mockResolvedValueOnce(mockedZip);

            // Act
            await controller.getZip(body, response as Response);

            // Assert
            expect(service.downloadMultipleFiles).toHaveBeenCalledWith(body);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="archivo-medico.zip"',
            });
            expect(mockedZip.getStream).toHaveBeenCalled();
            expect(mockedZip.getStream().pipe).toHaveBeenCalledWith(response);
        });
    });

    describe('deleteFile', () => {
        const type = FileSourceEnum.RESULT;
        const id = 1;
    
        it('should delete a file', async () => {
          // Arrange
          service.deleteFile.mockResolvedValueOnce(undefined);
    
          // Act
          const result = await controller.deleteFile(type, id);
    
          // Assert
          expect(result).toEqual({});
          expect(service.deleteFile).toHaveBeenCalledWith({ id, type });
        });
      });
    

});