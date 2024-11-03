import { TestBed } from "@automock/jest";
import { UnauthorizedException } from "@nestjs/common";
import { FileTreeDownloaderService } from "./file-tree-downloader.service";
import { MedicalResultFileTreeService } from "@/medical/medical-result/services/medical-result-file-tree.service";
import { Queue } from "bullmq";
import { ZipTreeRepository } from "../repositories/zip-tree.repository";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { getQueueToken } from "@nestjs/bullmq";

describe('FileTreeDownloaderService', () => {
    let service: FileTreeDownloaderService;
    let zipQueue: jest.Mocked<Queue>;
    let treeService: jest.Mocked<MedicalResultFileTreeService>;
    let repository: jest.Mocked<ZipTreeRepository>;
    let storage: jest.Mocked<StorageManager>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(FileTreeDownloaderService).compile();

        service = unit;
        zipQueue = unitRef.get(getQueueToken('zip-tree'));
        treeService = unitRef.get(MedicalResultFileTreeService);
        repository = unitRef.get(ZipTreeRepository);
        storage = unitRef.get(INJECT_STORAGE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('downloadTree', () => {
        const email = 'mocked@email.com';
        const code = 'test-code';
        const mockedData = { email: email, filepath: '/path/to/file.zip' }
        const mockedStream = {} as ReadStream;
        const expectedData = mockedStream;

        it('should download a zip file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedData as any);
            storage.readFile.mockResolvedValue(mockedStream);

            // Act
            const result = await service.downloadTree(email, code);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { zipCode: code } });
            expect(storage.readFile).toHaveBeenCalledWith(mockedData.filepath);
            expect(result).toEqual(expectedData);
        });

        it('should throws UnauthorizedException', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedData as any);
            storage.readFile.mockResolvedValue(mockedStream);

            // Act & Assert
            await expect(service.downloadTree('not-valid@email.comF', code))
                .rejects
                .toThrow(UnauthorizedException)
            expect(repository.findOne).toHaveBeenCalledWith({ where: { zipCode: code } });
            expect(storage.readFile).not.toHaveBeenCalled();
        });
    });
});