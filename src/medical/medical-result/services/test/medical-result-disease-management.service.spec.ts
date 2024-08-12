import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseRepository } from "../../repositories/medical-result-disease.repository";
import { MedicalResultDiseaseManagementService } from "../medical-result-disease-management.service";
import { MedicalResultManagementService } from "../medical-result-management.service";
import { PostMedicalResultDiseaseRequestDto } from "../../dtos/request/post.medical-result-disease.dto";
import { mockMedicalResultDisease, mockMedicalResultDiseaseArray } from "./stub/medical-result-disease.stub";
import { mockMedicalResult } from "./stub/medical-result.stub";
import { MedicalResultDisease } from "../../entities/medical-result-disease.entity";

describe('MedicalResultDiseaseManagementService', () => {
  let service: MedicalResultDiseaseManagementService;
  let repository: jest.Mocked<MedicalResultDiseaseRepository>;
  let managementService: jest.Mocked<MedicalResultManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultDiseaseManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultDiseaseRepository);
    managementService = unitRef.get(MedicalResultManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostMedicalResultDiseaseRequestDto = {
      medicalResultId: 1,
      diseaseId: 1,
      diseaseName: "Mocked disease",
      diseaseGroupId: 1,
      diseaseGroupName: "Mocked disease group",
      diseaseCommentary: "Commentary"
    }
    const mockedMedicalResultDisease = mockMedicalResultDisease();
    const mockedMedicalResult = mockMedicalResult();
    const expectResult = mockedMedicalResultDisease;

    it('should create a new medical result disease', async () => {
      // Arrange
      managementService.findOne.mockResolvedValue(mockedMedicalResult);
      repository.create.mockResolvedValue(mockedMedicalResultDisease);
      const { medicalResultId, ...data } = mockDto;

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(managementService.findOne).toHaveBeenCalledWith(medicalResultId);
      expect(repository.create).toHaveBeenCalledWith({ ...data, result: mockedMedicalResult });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findAll', () => {
    const mockedMedicalResultDiseases = mockMedicalResultDiseaseArray();
    const expectResult = mockedMedicalResultDiseases;

    it('should find all medical result diseases', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedMedicalResultDiseases);

      // Act
      const result = await service.findAll();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedMedicalResultDisease = mockMedicalResultDisease();
    const expectResult = mockedMedicalResultDisease;

    it('should find one medical result disease', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedMedicalResultDisease);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockDto: Partial<MedicalResultDisease> = {
      diseaseId: 1,
      diseaseName: "mocked-name",
      diseaseGroupId: 1,
      diseaseGroupName: "mocked-group",
      diseaseCommentary: "My commentary"
    }
    const mockedMedicalResultDisease = mockMedicalResultDisease();
    const expectResult = mockedMedicalResultDisease;

    it('should update a medical result disease', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue(mockedMedicalResultDisease);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a medical result disease', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});