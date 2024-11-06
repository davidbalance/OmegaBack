import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportFileManagementService } from "./medical-report-file-management.service";
import { TestBed } from "@automock/jest";
import { ReadStream } from "fs";
import { GenericFile } from "@/shared/utils/bases/base.file-service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { fileReportPath } from "@/shared/utils";
import { IFileSystem } from "@/shared/file-system/file-system.interface";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";

describe('MedicalReportFileManagementService', () => {
  let service: MedicalReportFileManagementService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let fileSystem: jest.Mocked<IFileSystem>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    fileSystem = unitRef.get(FILE_SYSTEM);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFile', () => {

    const key = 1;
    const mockedFilepath = 'test/filepath';
    const mockedBuffer = {} as Buffer;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
      } as any);
    });

    it('should return a read stream for the file', async () => {
      // Arrange
      fileSystem.read.mockResolvedValue(mockedBuffer);

      // Act
      const result = await service.getFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-report');
      expect(repository.query().select).toHaveBeenCalledWith('medical-report.fileAddress', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-report.id = :id', { id: key });
      expect(fileSystem.read).toHaveBeenCalledWith(mockedFilepath);
      expect(result).toEqual(mockedBuffer);
    });

    it('should update hasFile to false and throw error if file read fails', async () => {
      // Arrange
      const error = new Error('File read failed');
      fileSystem.read.mockRejectedValue(error);

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
      fileSystem.write.mockResolvedValue(mockedFilepath);
      const expectedPath = fileReportPath({ dni: mockedPatientDni, order: mockedOrderId });

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
      expect(fileSystem.write).toHaveBeenCalledWith(expectedPath, file.buffer, { extension: '.pdf', filename: 'test_exam' });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { fileAddress: `${mockedFilepath}`, hasFile: true });
      expect(result).toEqual(mockedFilepath);
    });

    it('should throw NotFoundException if medical result is not found', async () => {
      // Arrange
      repository.findOne.mockReturnValue(undefined);

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(NotFoundException);
      expect(fileSystem.write).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if file save fails', async () => {
      // Arrange
      repository.findOne.mockReturnValue({
        examName: mockedExamName,
        order: mockedOrderId,
        patientDni: mockedPatientDni,
      } as any);
      fileSystem.write.mockRejectedValue(new InternalServerErrorException(''));
      const expectedPath = fileReportPath({ dni: mockedPatientDni, order: mockedOrderId });

      // Act and Assert
      await expect(service.uploadFile(key, file)).rejects.toThrow(InternalServerErrorException);
      expect(fileSystem.write).toHaveBeenCalledWith(expectedPath, file.buffer, { extension: '.pdf', filename: 'test_exam' });
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
      fileSystem.delete.mockResolvedValue(undefined);
      repository.findOneAndUpdate.mockResolvedValue(undefined);

      // Act
      const result = await service.removeFile(key);

      // Assert
      expect(service.getFilePath).toHaveBeenCalledWith(key);
      expect(fileSystem.delete).toHaveBeenCalledWith(mockedFilepath);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
      expect(result).toEqual(true);
    });

    it('should return false if file deletion fails', async () => {
      // Arrange
      const error = new Error('File deletion failed');
      jest.spyOn(service, 'getFilePath').mockResolvedValue(mockedFilepath);
      fileSystem.delete.mockRejectedValue(error);

      // Act
      const result = await service.removeFile(key);

      // Assert
      expect(service.getFilePath).toHaveBeenCalledWith(key);
      expect(fileSystem.delete).toHaveBeenCalledWith(mockedFilepath);
      expect(result).toEqual(false);
    });
  });
});