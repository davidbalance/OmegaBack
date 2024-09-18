import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { MedicalResultDiseaseManagementController } from "./medical-result-disease-management.controller";
import { mockMedicalDiseases } from "../stub/medical-disease.stub";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.post.dto";

describe('MedicalResultDiseaseManagementController', () => {
  let controller: MedicalResultDiseaseManagementController;
  let service: jest.Mocked<MedicalResultDiseaseManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultDiseaseManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultDiseaseManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should find medical result diseases by result ID', async () => {
      // Arrange
      const result = 1;
      const mockedDiseases = mockMedicalDiseases();
      service.find.mockResolvedValue(mockedDiseases);

      // Act
      const resultDiseases = await controller.find(result);

      // Assert
      expect(service.find).toHaveBeenCalledWith(result);
      expect(resultDiseases).toEqual({ data: mockedDiseases });
    });
  });

  describe('create', () => {
    it('should create a medical result disease', async () => {
      // Arrange
      const result = 1;
      const mockDto: PostMedicalResultDiseaseRequestDto = {
        diseaseName: 'Test Disease',
        diseaseGroupName: 'Test Group',
        diseaseCommentary: 'Test Commentary',
        diseaseId: 1,
        diseaseGroupId: 1
      };
      service.create.mockResolvedValue(undefined);

      // Act
      const resultDisease = await controller.create(result, mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(result, mockDto);
      expect(resultDisease).toEqual({});
    });
  });
});