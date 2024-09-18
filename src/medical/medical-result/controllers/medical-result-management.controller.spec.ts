import { TestBed } from "@automock/jest";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { MedicalResultManagementController } from "./medical-result-management.controller";
import { mockMedicalResult } from "../stub/medical-result.stub";
import { PatchMedicalResultRequestDto } from "../dtos/request/medical-result.patch.dto";

describe('MedicalResultManagementController', () => {
  let controller: MedicalResultManagementController;
  let service: jest.Mocked<MedicalResultManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should find and return a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResult();
      service.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await controller.find(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockedResult);
    });
  });

  describe('updateOne', () => {
    it('should update a medical result', async () => {
      // Arrange
      const id = 1;
      const mockDto: PatchMedicalResultRequestDto = {
        examType: "Test type",
        examSubtype: "Test subtype",
        examName: "Test exam"
      };
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual({});
    });
  });
});