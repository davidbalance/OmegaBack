import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { MedicalResultFileManagementService } from "../medical-result-file-management.service";
import { MedicalResultRepository } from "../../repositories/medical-result.repository";
import { TestBed } from "@automock/jest";
import { mockMedicalResult } from "./stub/medical-result.stub";
import { NotFoundException, StreamableFile } from "@nestjs/common";
import { extname } from "path";
import { fileResultPath } from "@/shared/utils";

describe('MedicalResultFileManagementService', () => {
  let service: MedicalResultFileManagementService;
  let repository: jest.Mocked<MedicalResultRepository>;
  let storageService: jest.Mocked<StorageManager>

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
    storageService = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFile', () => {
    const key: number = 1;
    const mockedMedicalResult = mockMedicalResult();
    const mockedFile: StreamableFile = {} as StreamableFile;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedMedicalResult.filePath })
      } as any);
    });

    it('should get a file', async () => {
      // Arrange
      storageService.readFile.mockResolvedValue(mockedFile);

      // Act
      const result = await service.getFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storageService.readFile).toHaveBeenCalledWith(mockedMedicalResult.filePath);
      expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
      expect(result).toEqual(mockedFile);
    });

    it('should update hasFile to false if an error occurs', async () => {
      // Arrange
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedMedicalResult.filePath })
      } as any);
      storageService.readFile.mockRejectedValue(new Error('Error reading file'));

      // Act & Assert
      await expect(service.getFile(key))
        .rejects
        .toThrowError(Error);
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storageService.readFile).toHaveBeenCalledWith(mockedMedicalResult.filePath);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
    });
  });

  describe('uploadFile', () => {
    const key: number = 1;
    const mockedFile = {
      buffer: Buffer.from('Testing buffer'),
      originalname: 'test-file.pdf'
    } as Express.Multer.File;
    const mockedClientDni = '1234567890';
    const mockedOrderId = 1;
    const mockedExamName = 'Exam Name';
    const mockedFilePath = 'path/to/file';
    const expectFilePath = mockedFilePath;

    it('should upload a file', async () => {
      // Arrange
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          examName: mockedExamName,
          orderId: mockedOrderId,
          clientDni: mockedClientDni
        })
      } as any);
      storageService.saveFile.mockResolvedValue(mockedFilePath);

      // Act
      const result = await service.uploadFile(key, mockedFile);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical_result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledTimes(2);
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'medical_result.order', 'medical_order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(2, 'medical_order.client', 'medical_client');
      expect(repository.query().select).toHaveBeenCalledWith('medical_result.examName', 'examName');
      expect(repository.query().addSelect).toHaveBeenCalledTimes(2);
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'medical_order.id', 'orderId');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'medical_client.dni', 'clientDni');
      expect(repository.query().where).toHaveBeenCalledWith('medical_result.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storageService.saveFile).toHaveBeenCalledWith(
        mockedFile.buffer,
        extname(mockedFile.originalname),
        fileResultPath({ dni: mockedClientDni, order: mockedOrderId }),
        mockedExamName.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, '_')
      );
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { filePath: mockedFilePath, hasFile: true });
      expect(result).toEqual(expectFilePath);
    });

    it('should throw an error if medical result not found', async () => {
      // Arrange
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined)
      } as any);

      // Act & Assert
      await expect(service.uploadFile(key, mockedFile))
        .rejects
        .toThrowError(NotFoundException);
    });
  });

  describe('getFilePath', () => {
    const key: number = 1;
    const mockedMedicalResult = mockMedicalResult();

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedMedicalResult.filePath })
      } as any);

    })

    it('should get the file path', async () => {
      // Arrange
      // Act
      const result = await service.getFilePath(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(result).toEqual(mockedMedicalResult.filePath);
    });
  });

  describe('removeFile', () => {
    const key: number = 1;
    const mockedFilePath = 'path/to/file';

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilePath })
      } as any);
    });

    it('should remove a file', async () => {
      // Arrange
      storageService.deleteFile.mockResolvedValue(undefined);

      // Act
      const result = await service.removeFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storageService.deleteFile).toHaveBeenCalledWith(mockedFilePath);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
      expect(result).toEqual(true);
    });

    it('should return false if an error occurs', async () => {
      // Arrange
      storageService.deleteFile.mockRejectedValue(new Error('Error deleting file'));

      // Act
      const result = await service.removeFile(key);

      // Assert
      expect(result).toEqual(false);
    });
  });

});