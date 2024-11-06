import { UrlFileFetcherService } from "@/shared/url-file-fetcher/url-file-fetcher.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { TestBed } from "@automock/jest";
import { GenericFile } from "@/shared/utils/bases/base.file-service";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Base64Service } from "@/shared/base64/base64.service";
import { MedicalResultEventService } from "./medical-result-event.service";
import { fileResultPath } from "@/shared/utils";
import { IFileSystem } from "@/shared/file-system/file-system.interface";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";
import { Path } from "@/shared/nest-ext/path/path.type";
import { NEST_PATH } from "@/shared/nest-ext/path/inject-token";

describe('MedicalResultFileManagementService', () => {
  let service: MedicalResultFileManagementService;
  let repository: jest.Mocked<MedicalResultRepository>;
  let urlFileFetcherService: jest.Mocked<UrlFileFetcherService>;
  let base64Service: jest.Mocked<Base64Service>;
  let eventService: jest.Mocked<MedicalResultEventService>;
  let fileSystem: jest.Mocked<IFileSystem>;
  let path: jest.Mocked<Path>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
    urlFileFetcherService = unitRef.get(UrlFileFetcherService);
    base64Service = unitRef.get(Base64Service);
    eventService = unitRef.get(MedicalResultEventService);
    fileSystem = unitRef.get(FILE_SYSTEM);
    path = unitRef.get(NEST_PATH);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFile', () => {
    it('should return a read stream for the file', async () => {
      // Arrange
      const key = 1;
      const mockedFilepath = 'test/filepath';
      const mockedBuffer = {} as Buffer;
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ filepath: mockedFilepath }),
      } as any);
      fileSystem.read.mockResolvedValue(mockedBuffer);

      // Act
      const result = await service.getFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-result');
      expect(repository.query().select).toHaveBeenCalledWith('medical-result.filePath', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-result.id = :id', { id: key });
      expect(fileSystem.read).toHaveBeenCalledWith(mockedFilepath);
      expect(result).toEqual(mockedBuffer);
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
    const mockedFilepath = 'test/filepath';

    const mockedYear = '20XX';
    const mockedCorporativeGroup = 'Test group';
    const mockedCompanyName = 'Test company';
    const mockedCompanyRuc = '17XXXXXXXX001';
    const mockedBranch = 'Test branch';
    const mockedPatientDni = '17XXXXXXXX';
    const mockedClientName = 'Test name';
    const mockedClientLastname = 'Test lastname';
    const mockedOrderId = 1;
    const mockedExamName = 'Test Exam';


    it('should upload the file and update the medical result', async () => {
      // Arrange
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          year: mockedYear,
          corporativeGroup: mockedCorporativeGroup,
          companyName: mockedCompanyName,
          companyRuc: mockedCompanyRuc,
          branch: mockedBranch,
          patientDni: mockedPatientDni,
          clientName: mockedClientName,
          clientLastname: mockedClientLastname,
          orderId: mockedOrderId,
          examName: mockedExamName,
        }),
        findOneAndUpdate: jest.fn(),
      } as any);
      const expectedPath = fileResultPath({
        year: mockedYear,
        corporativeGroup: mockedCorporativeGroup,
        companyName: mockedCompanyName,
        companyRuc: mockedCompanyRuc,
        branch: mockedBranch,
        patientDni: mockedPatientDni,
        patientName: `${mockedClientName} ${mockedClientLastname}`,
        order: mockedOrderId,
      });

      fileSystem.write.mockResolvedValue(mockedFilepath);
      path.extname.mockReturnValue('.pdf');

      // Act
      const result = await service.uploadFile(key, file);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('result.order', 'order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.client', 'client');
      expect(repository.query().select).toHaveBeenCalledWith('YEAR(order.createAt)', 'year');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'order.corporativeName', 'corporativeGroup');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'order.companyName', 'companyName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'order.companyRuc', 'companyRuc');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'order.branchName', 'branch');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'client.branchName', 'branch');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'client.dni', 'patientDni');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(7, 'client.name', 'clientName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(8, 'client.lastname', 'clientLastname');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(9, 'result.examName', 'examName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(10, 'order.id', 'orderId');
      expect(repository.query().where).toHaveBeenCalledWith('result.id = :id', { id: key });
      expect(fileSystem.write).toHaveBeenCalledWith(expectedPath, file.buffer, { extension: '.pdf', filename: `${mockedOrderId.toString().padStart(9, '0')}_${mockedExamName.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, '_')}` });
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
          year: mockedYear,
          corporativeGroup: mockedCorporativeGroup,
          companyName: mockedCompanyName,
          companyRuc: mockedCompanyRuc,
          branch: mockedBranch,
          patientDni: mockedPatientDni,
          clientName: mockedClientName,
          clientLastname: mockedClientLastname,
          orderId: mockedOrderId,
          examName: mockedExamName,
        }),
      } as any);
      fileSystem.write.mockRejectedValue(error);

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
      const key = 1;
      const mockedFilepath = 'test/filepath';
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