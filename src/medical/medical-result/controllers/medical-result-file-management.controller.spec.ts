import { TestBed } from "@automock/jest";
import { MedicalResultFileManagementService } from "../services/medical-result-file-management.service";
import { MedicalResultFileManagementController } from "./medical-result-file-management.controller";

describe('MedicalResultFileManagementController', () => {
  let controller: MedicalResultFileManagementController;
  let service: jest.Mocked<MedicalResultFileManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultFileManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultFileManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload a file', async () => {
      // Arrange
      const id = 1;
      const file = {} as Express.Multer.File;
      service.uploadFile.mockResolvedValue(undefined);

      // Act
      const result = await controller.uploadFile(id, {} as any, file);

      // Assert
      expect(service.uploadFile).toHaveBeenCalledWith(id, file);
      expect(result).toEqual({});
    });
  });
});
