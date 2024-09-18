import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { MedicalDiseaseManagementController } from "./medical-disease-management.controller";
import { mockMedicalDisease } from "../stub/medical-disease.stub";
import { PatchMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.patch.dto";

describe('MedicalDiseaseManagementController', () => {
  let controller: MedicalDiseaseManagementController;
  let service: jest.Mocked<MedicalResultDiseaseManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalDiseaseManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultDiseaseManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should find a medical result disease by ID', async () => {
      // Arrange
      const id = '1';
      const mockedDisease = mockMedicalDisease();
      service.findOne.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(mockedDisease);
    });
  });

  describe('updateOne', () => {
    it('should update a medical result disease', async () => {
      // Arrange
      const id = 1;
      const mockDto: PatchMedicalResultDiseaseRequestDto = {
        diseaseName: 'Updated Disease',
        diseaseId: 1,
        diseaseGroupId: 1,
        diseaseGroupName: "Test name",
        diseaseCommentary: "Test commentary"
      };
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual({});
    });
  });

  describe('deleteOne', () => {
    it('should delete a medical result disease', async () => {
      // Arrange
      const id = 1;
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });
});