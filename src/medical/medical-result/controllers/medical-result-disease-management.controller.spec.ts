import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { MedicalResultDiseaseManagementController } from "./medical-result-disease-management.controller";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/post.medical-result-disease.dto";
import { mockMedicalResult } from "../services/test/stub/medical-result.stub";
import { PostMedicalResultDiseaseResponseDto } from "../dtos/response/post.medical-result-disease.response.dto";
import { mockMedicalResultDisease, mockMedicalResultDiseaseArray } from "../services/test/stub/medical-result-disease.stub";
import { GetMedicalResultDiseaseArrayResponseDto } from "../dtos/response/get.medical-result-disease-array.response.dto";
import { GetMedicalResultDiseaseResponseDto } from "../dtos/response/get.medical-result-disease.response.dto";
import { PatchMedicalResultDiseaseRequestDto } from "../dtos/request/patch.medical-result-disease.request.dto";
import { PatchMedicalResultDiseaseResponseDto } from "../dtos/response/patch.medical-result-disease.response.dto";

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

  describe('create', () => {
    const mockDto: PostMedicalResultDiseaseRequestDto = {
      medicalResultId: 1,
      diseaseId: 1,
      diseaseName: "My Disease",
      diseaseGroupId: 1,
      diseaseGroupName: "My Disease group",
      diseaseCommentary: "My commentary"
    };
    const mockedDisease = mockMedicalResultDisease();
    const expectResult: any = mockedDisease;

    it('should call create service method with correct parameters', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('find', () => {
    const mockedDisease = mockMedicalResultDiseaseArray();
    const expectResult: GetMedicalResultDiseaseArrayResponseDto = { data: mockedDisease as any };

    it('should call findAll service method', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedDisease = mockMedicalResultDisease();
    const expectResult: GetMedicalResultDiseaseResponseDto = mockedDisease as any;

    it('should call findOne service method with correct id', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.findOne(id.toString());

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchMedicalResultDiseaseRequestDto = {
      diseaseId: 1,
      diseaseName: "Disease",
      diseaseGroupId: 1,
      diseaseGroupName: "Disease group",
      diseaseCommentary: "Commentary"
    };
    const mockedDisease = mockMedicalResultDisease();
    const expectResult: PatchMedicalResultDiseaseResponseDto = mockedDisease as any;

    it('should call updateOne service method with correct parameters', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should call deleteOne service method with correct id', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
    });
  });

});