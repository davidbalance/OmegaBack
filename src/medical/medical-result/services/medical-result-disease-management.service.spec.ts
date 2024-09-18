import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultDiseaseManagementService } from "./medical-result-disease-management.service";
import { mockMedicalDiseaseEntities, mockMedicalDiseaseEntity } from "../stub/medical-disease-entity.stub";
import { MedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.base.dto";

describe('MedicalResultDiseaseManagementService', () => {
  let service: MedicalResultDiseaseManagementService;
  let repository: jest.Mocked<MedicalResultDiseaseRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultDiseaseManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultDiseaseRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return an array of medical result diseases', async () => {
      // Arrange
      const result = 1;
      const mockedDiseases = mockMedicalDiseaseEntities();
      repository.find.mockResolvedValue(mockedDiseases);

      // Act
      const resultDiseases = await service.find(result);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { result: { id: result } } });
      expect(resultDiseases).toEqual(mockedDiseases);
    });
  });

  describe('create', () => {
    it('should create a medical result disease', async () => {
      // Arrange
      const medicalResultId = 1;
      const mockDto: MedicalResultDiseaseRequestDto = {
        diseaseName: 'Test Disease',
        diseaseGroupName: 'Test Group',
        diseaseCommentary: 'Test Commentary',
        diseaseId: 1,
        diseaseGroupId: 1
      };
      const mockedDisease = mockMedicalDiseaseEntity();
      repository.create.mockResolvedValue(mockedDisease);

      // Act
      const resultDisease = await service.create(medicalResultId, mockDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, result: { id: medicalResultId } });
      expect(resultDisease).toEqual(mockedDisease);
    });
  });

  describe('findOne', () => {
    it('should return a medical result disease by ID', async () => {
      // Arrange
      const id = 1;
      const mockedDisease = mockMedicalDiseaseEntity();
      repository.findOne.mockResolvedValue(mockedDisease);

      // Act
      const resultDisease = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(resultDisease).toEqual(mockedDisease);
    });
  });

  describe('updateOne', () => {
    it('should update a medical result disease', async () => {
      // Arrange
      const id = 1;
      const data = { diseaseName: 'Updated Disease' };
      const mockedDisease = mockMedicalDiseaseEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedDisease);

      // Act
      const resultDisease = await service.updateOne(id, data);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, data);
      expect(resultDisease).toEqual(mockedDisease);
    });
  });

  describe('deleteOne', () => {
    it('should delete a medical result disease', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});