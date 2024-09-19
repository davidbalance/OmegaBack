import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportFileManagementService } from "./medical-report-file-management.service";
import { TestBed } from "@automock/jest";
import { ReadStream } from "fs";
import { GenericFile } from "@/shared/utils/bases/base.file-service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

describe('MedicalReportFileManagementService', () => {
  let service: MedicalReportFileManagementService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let storageManager: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    storageManager = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFile', () => {

    const key = 1;
    const mockedFilepath = 'test/filepath';
    const mockedReadStream = {} as ReadStream;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
      } as any);
    });

    it('should return a read stream for the file', async () => {
      // Arrange
      storageManager.readFile.mockResolvedValue(mockedReadStream);

      // Act
      const result = await service.getFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-report');
      expect(repository.query().select).toHaveBeenCalledWith('medical-report.fileAddress', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-report.id = :id', { id: key });
      expect(storageManager.readFile).toHaveBeenCalledWith(mockedFilepath);
      expect(result).toEqual(mockedReadStream);
    });

    it('should update hasFile to false and throw error if file read fails', async () => {
      // Arrange
      const error = new Error('File read failed');
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
    const mockedPatientDni = '1234567890';
    const mockedFilepath = 'test/filepath';

    it('should upload the file and update the medical result', async () => {
      // Arrange
      repository.findOne.mockResolvedValue({
        examName: mockedExamName,
        order: mockedOrderId,
        patientDni: mockedPatientDni,
      } as any);
      storageManager.saveFile.mockResolvedValue(mockedFilepath);

      // Act
      const result = await service.uploadFile(key, file);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: key },
        select: {
          examName: true,
          patientDni: true,
          order: true
        }
      });
      expect(storageManager.saveFile).toHaveBeenCalledWith(
        file.buffer,
        '.pdf',
        `medical-report-pdf/${mockedPatientDni}/${mockedOrderId}/report`,
        'test_exam',
      );
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { fileAddress: `${mockedFilepath}`, hasFile: true });
      expect(result).toEqual(mockedFilepath);
    });

    it('should throw NotFoundException if medical result is not found', async () => {
      // Arrange
      repository.findOne.mockReturnValue(undefined);

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(NotFoundException);
      expect(storageManager.saveFile).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if file save fails', async () => {
      // Arrange
      repository.findOne.mockReturnValue({
        examName: mockedExamName,
        order: mockedOrderId,
        patientDni: mockedPatientDni,
      } as any);
      storageManager.saveFile.mockRejectedValue(new InternalServerErrorException(''));

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(InternalServerErrorException);
      expect(storageManager.saveFile).toHaveBeenCalledWith(
        file.buffer,
        '.pdf',
        `medical-report-pdf/${mockedPatientDni}/${mockedOrderId}/report`,
        'test_exam',
      );
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { id: key },
        { fileAddress: null, hasFile: false }
      );
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
      expect(repository.query).toHaveBeenCalledWith('medical-report');
      expect(repository.query().select).toHaveBeenCalledWith('medical-report.fileAddress', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-report.id = :id', { id: key });
      expect(result).toEqual(mockedFilepath);
    });
  });

  describe('removeFile', () => {
    const key = 1;
    const mockedFilepath = 'test/filepath';

    it('should remove the file and update the medical result', async () => {
      // Arrange
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