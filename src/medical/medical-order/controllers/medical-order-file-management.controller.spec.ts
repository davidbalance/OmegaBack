import { TestBed } from "@automock/jest";
import { MedicalOrderFileManagementService } from "../services/medical-order-file-management.service";
import { MedicalOrderFileManagementController } from "./medical-order-file-management.controller";

describe('MedicalOrderFileManagementController', () => {
  let controller: MedicalOrderFileManagementController;
  let service: jest.Mocked<MedicalOrderFileManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderFileManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderFileManagementService);
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
