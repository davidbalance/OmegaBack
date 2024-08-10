import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { MedicalReportRepository } from "../../repositories/medical-report.repository";
import { MedicalReportFileManagementService } from "../medical-report-file-management.service";
import { TestBed } from "@automock/jest";
import { NotFoundException, StreamableFile } from "@nestjs/common";

describe('MedicalReportFileManagementService', () => {
  let service: MedicalReportFileManagementService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let storage: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportFileManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    storage = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFile', () => {
    const key = 1;
    const mockFilepath = { filepath: "/mocked/file" }
    const mockFile: StreamableFile = new StreamableFile(Buffer.from('test'));
    const expectResult = mockFile;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockReturnValueOnce(mockFilepath)
      } as any);
    });

    it('should return a StreamableFile if file exists', async () => {
      // Arrange
      storage.readFile.mockResolvedValue(mockFile);

      // Act
      const result = await service.getFile(key);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('medical-report');
      expect(repository.query().select).toHaveBeenCalledWith('medical-report.fileAddress', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-report.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storage.readFile).toHaveBeenCalledWith(mockFilepath.filepath);
      expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });

    it('should update hasFile to false and throw error if file not found', async () => {
      // Arrange
      storage.readFile.mockRejectedValueOnce(new NotFoundException());

      // Act & Assert
      await expect(service.getFile(key))
        .rejects
        .toThrowError(NotFoundException);
      expect(repository.query).toHaveBeenCalledWith('medical-report');
      expect(repository.query().select).toHaveBeenCalledWith('medical-report.fileAddress', 'filepath');
      expect(repository.query().where).toHaveBeenCalledWith('medical-report.id = :id', { id: key });
      expect(repository.query().getRawOne).toHaveBeenCalled();
      expect(storage.readFile).toHaveBeenCalledWith(mockFilepath.filepath);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: key }, { hasFile: false });
    });
  });
});