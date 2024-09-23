import { UrlFileFetcherService } from "@/shared/url-file-fetcher/url-file-fetcher.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { TestBed } from "@automock/jest";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { GenericFile } from "@/shared/utils/bases/base.file-service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Base64Service } from "@/shared/base64/base64.service";
import { MedicalResultEventService } from "./medical-result-event.service";
import { fileResultPath } from "@/shared/utils";

describe('MedicalResultFileManagementService', () => {
  let service: MedicalResultFileManagementService;
  let repository: jest.Mocked<MedicalResultRepository>;
  let urlFileFetcherService: jest.Mocked<UrlFileFetcherService>;
  let base64Service: jest.Mocked<Base64Service>;
  let eventService: jest.Mocked<MedicalResultEventService>;
  let storageManager: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
    urlFileFetcherService = unitRef.get(UrlFileFetcherService);
    base64Service = unitRef.get(Base64Service);
    eventService = unitRef.get(MedicalResultEventService);
    storageManager = unitRef.get(INJECT_STORAGE_MANAGER);
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
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
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

  describe('uploadFile', () => {
    const key = 1;
    const file: GenericFile = {
      originalname: 'test.pdf',
      buffer: Buffer.from('test'),
      mimetype: "application/json"
    };
    const mockedExamName = 'Test Exam';
    const mockedOrderId = 1;
    const mockedClientDni = '1234567890';
    const mockedFilepath = 'test/filepath';

    it('should upload the file and update the medical result', async () => {
      // Arrange
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          examName: mockedExamName,
          orderId: mockedOrderId,
          clientDni: mockedClientDni,
        }),
        findOneAndUpdate: jest.fn(),
      } as any);
      const expectedPath = fileResultPath({ dni: mockedClientDni, order: mockedOrderId });

      storageManager.saveFile.mockResolvedValue(mockedFilepath);

      // Act
      const result = await service.uploadFile(key, file);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical_result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('medical_result.order', 'medical_order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('medical_order.client', 'medical_client');
      expect(repository.query().select).toHaveBeenCalledWith('medical_result.examName', 'examName');
      expect(repository.query().addSelect).toHaveBeenCalledWith('medical_order.id', 'orderId');
      expect(repository.query().addSelect).toHaveBeenCalledWith('medical_client.dni', 'clientDni');
      expect(repository.query().where).toHaveBeenCalledWith('medical_result.id = :id', { id: key });
      expect(storageManager.saveFile).toHaveBeenCalledWith(file.buffer, '.pdf', expectedPath, 'test_exam');
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { filePath: `${mockedFilepath}`, hasFile: true });
      expect(eventService.emitOnMedicalResultUploadFileEvent).toHaveBeenCalledWith(key);
      expect(result).toEqual(mockedFilepath);
    });

    it('should throw NotFoundException if medical result is not found', async () => {
      // Arrange
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined),
      } as any);

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException if file save fails', async () => {
      // Arrange
      const key = 1;
      const file: GenericFile = {
        originalname: 'test.pdf',
        buffer: Buffer.from('test'),
        mimetype: "application/json"
      };
      const mockedExamName = 'Test Exam';
      const mockedOrderId = 1;
      const mockedClientDni = '1234567890';
      const error = new Error('File save failed');
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          examName: mockedExamName,
          orderId: mockedOrderId,
          clientDni: mockedClientDni,
        }),
      } as any);
      storageManager.saveFile.mockRejectedValue(error);

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('uploadFromUrl', () => {
    it('should upload the file from url and update the medical result', async () => {
      // Arrange
      const key = 1;
      const url = 'https://example.com/test.pdf';
      const mockedFile = {
        filename: 'test.pdf',
        buffer: Buffer.from('test'),
        mimetype: "application/json"
      };
      const mockedFilepath = 'test/filepath';
      urlFileFetcherService.fetch.mockResolvedValue(mockedFile);
      jest.spyOn(service, 'uploadFile').mockResolvedValue(mockedFilepath);

      // Act
      const result = await service.uploadFromUrl(key, url);

      // Assert
      expect(urlFileFetcherService.fetch).toHaveBeenCalledWith(url);
      expect(service.uploadFile).toHaveBeenCalledWith(key, { originalname: mockedFile.filename, ...mockedFile });
      expect(result).toEqual(mockedFilepath);
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
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(result).toEqual(mockedFilepath);
    });
  });

  describe('removeFile', () => {
    it('should remove the file and update the medical result', async () => {
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