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

  describe('findOneResultAndUploadFile', () => {
    const id = 1;
    const fileMock = {} as any;

    it('should call uploadFile service method with correct parameters', async () => {
      // Arrange
      service.uploadFile.mockResolvedValue(undefined);

      // Act
      await controller.findOneResultAndUploadFile(id, {} as any, fileMock);

      // Assert
      expect(service.uploadFile).toHaveBeenCalledWith(id, fileMock);
    });
  });
});