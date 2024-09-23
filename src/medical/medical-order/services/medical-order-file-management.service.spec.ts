import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderFileManagementService } from "./medical-order-file-management.service";
import { TestBed } from "@automock/jest";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { GenericFile } from "@/shared/utils/bases/base.file-service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Base64Service } from "@/shared/base64/base64.service";
import { fileOrderPath } from "@/shared/utils";

describe('MedicalOrderFileManagementService', () => {
    let service: MedicalOrderFileManagementService;
    let repository: jest.Mocked<MedicalOrderRepository>;
    let storageManager: jest.Mocked<StorageManager>;
    let base64Service: jest.Mocked<Base64Service>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderFileManagementService).compile();

        service = unit;
        repository = unitRef.get(MedicalOrderRepository);
        storageManager = unitRef.get(INJECT_STORAGE_MANAGER);
        base64Service = unitRef.get(Base64Service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getFile', () => {
        it('should return a read stream for the file', async () => {
            // Arrange
            const key = 1;
            const mockedFilepath = 'test/filepath';
            const mockedReadStream = {} as ReadStream;
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
            } as any);
            storageManager.readFile.mockResolvedValue(mockedReadStream);

            // Act
            const result = await service.getFile(key);

            // Assert
            expect(repository.query).toHaveBeenCalledWith('order');
            expect(repository.query().select).toHaveBeenCalledWith('order.fileAddress', 'filepath');
            expect(repository.query().where).toHaveBeenCalledWith('order.id = :id', { id: key });
            expect(storageManager.readFile).toHaveBeenCalledWith(mockedFilepath);
            expect(result).toEqual(mockedReadStream);
        });

        it('should update hasFile to false and throw error if file read fails', async () => {
            // Arrange
            const key = 1;
            const mockedFilepath = 'test/filepath';
            const error = new Error('File read failed');
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
            } as any);
            storageManager.readFile.mockRejectedValue(error);

            // Act and Assert
            await expect(service.getFile(key)).rejects.toThrowError(error);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
        });
    });

    describe('getFilePath', () => {
        it('should return the file path', async () => {
            // Arrange
            const key = 1;
            const mockedFilepath = 'test/filepath';
            jest.spyOn(service, 'getFile').mockResolvedValue({} as any);
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
            } as any);

            // Act
            const result = await service.getFilePath(key);

            // Assert
            expect(service.getFile).toHaveBeenCalledWith(key);
            expect(repository.query).toHaveBeenCalledWith('order');
            expect(repository.query().select).toHaveBeenCalledWith('order.fileAddress', 'filepath');
            expect(repository.query().where).toHaveBeenCalledWith('order.id = :id', { id: key });
            expect(result).toEqual(mockedFilepath);
        });
    });

    describe('uploadFile', () => {
        const key = 1;
        const file: GenericFile = {
            originalname: 'test.pdf',
            buffer: Buffer.from('test'),
            mimetype: "application/json"
        };
        const mockedOrder = {
            id: 1,
            dni: '1234567890'
        };
        const mockedFilepath = 'test/filepath';

        it('should upload the file and update the medical order', async () => {
            // Arrange
            repository.query.mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockReturnValue(mockedOrder)
            } as any);
            storageManager.saveFile.mockResolvedValue(mockedFilepath);
            const expectedPath = fileOrderPath({ dni: mockedOrder.dni, order: mockedOrder.id });

            // Act
            const result = await service.uploadFile(key, file);

            // Assert
            expect(repository.query).toHaveBeenCalledWith('order');
            expect(repository.query().leftJoin).toHaveBeenCalledWith('order.client', 'client');
            expect(repository.query().select).toHaveBeenCalledWith('order.id', 'id');
            expect(repository.query().addSelect).toHaveBeenCalledWith('client.dni', 'dni');
            expect(storageManager.saveFile).toHaveBeenCalledWith(file.buffer, '.pdf', expectedPath, `medical_order_${mockedOrder.id.toString().padStart(9, '0')}`);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { fileAddress: `${mockedFilepath}`, hasFile: true });
            expect(result).toEqual(mockedFilepath);
        });

        it('should throw NotFoundException if medical order is not found', async () => {
            // Arrange
            repository.query.mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockReturnValue(undefined)
            } as any);
            // Act and Assert
            await expect(service.uploadFile(key, file)).rejects.toThrow(NotFoundException);
            expect(storageManager.saveFile).not.toHaveBeenCalled();
            expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
        });

        it('should throw InternalServerErrorException if file save fails', async () => {
            // Arrange
            repository.query.mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getRawOne: jest.fn().mockReturnValue(mockedOrder)
            } as any);
            storageManager.saveFile.mockRejectedValue(new InternalServerErrorException(''));
            const expectedPath = fileOrderPath({ dni: mockedOrder.dni, order: mockedOrder.id });

            // Act and Assert
            await expect(service.uploadFile(key, file)).rejects.toThrow(InternalServerErrorException);
            expect(storageManager.saveFile).toHaveBeenCalledWith(file.buffer, '.pdf', expectedPath, `medical_order_${mockedOrder.id.toString().padStart(9, '0')}`);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { id: key },
                { fileAddress: null, hasFile: false }
            );
        });
    });

    describe('uploadFromBase64', () => {
        it('should upload the file from base64 and update the medical result', async () => {
            // Arrange
            const key = 1;
            const mimetype: string = 'application/pdf';
            const base64 = 'JVBERi0xLjMKJcfsf/A==';
            const mockedBuffer = Buffer.from('JVBERi0xLjMKJcfsf/A==', 'base64');
            const mockedFilepath = 'test/filepath';
            base64Service.toBuffer.mockReturnValue(mockedBuffer);
            jest.spyOn(service, 'uploadFile').mockResolvedValue(mockedFilepath);

            // Act
            const result = await service.uploadFromBase64(key, mimetype, base64);

            // Assert
            expect(base64Service.toBuffer).toHaveBeenCalledWith(base64);
            expect(service.uploadFile).toHaveBeenCalledWith(key, {
                originalname: expect.any(String),
                mimetype: 'application/pdf',
                buffer: mockedBuffer,
            });
            expect(result).toEqual(mockedFilepath);
        });
    });


    describe('removeFile', () => {
        it('should remove the file and update the medical order', async () => {
            // Arrange
            const key = 1;
            const mockedFilepath = 'test/filepath';
            jest.spyOn(service, 'getFilePath').mockResolvedValue(mockedFilepath);
            storageManager.deleteFile.mockResolvedValue(undefined);
            repository.findOneAndUpdate.mockResolvedValue(undefined);

            // Act
            const result = await service.removeFile(key);

            // Assert
            expect(service.getFilePath).toHaveBeenCalledWith(key);
            expect(storageManager.deleteFile).toHaveBeenCalledWith(mockedFilepath);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
            expect(result).toEqual(true);
        });

        it('should return false if file deletion fails', async () => {
            // Arrange
            const key = 1;
            const mockedFilepath = 'test/filepath';
            const error = new Error('File deletion failed');
            jest.spyOn(service, 'getFilePath').mockResolvedValue(mockedFilepath);
            storageManager.deleteFile.mockRejectedValue(error);

            // Act
            const result = await service.removeFile(key);

            // Assert
            expect(service.getFilePath).toHaveBeenCalledWith(key);
            expect(storageManager.deleteFile).toHaveBeenCalledWith(mockedFilepath);
            expect(result).toEqual(false);
        });
    });
});

