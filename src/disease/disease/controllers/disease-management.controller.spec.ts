/* import { TestBed } from "@automock/jest";
import { DiseaseManagementService } from "../services/disease-management.service";
import { Disease } from "../entities/disease.entity";
import { PostDiseaseRequestDto } from "../dtos/request/disease.post.dto";
import { PostDiseaseResponseDto } from "../dtos/response/post.disease.response.dto";
import { PatchDiseaseRequestDto } from "../dtos/request/disease.patch.dto";
import { PatchDiseaseResponseDto } from "../dtos/response/patch.disease.response.dto"; */

import { TestBed } from "@automock/jest";
import { DiseaseManagementController } from "./disease-management.controller";
import { DiseaseManagementService } from "../services/disease-management.service";
import { PostDiseaseRequestDto } from "../dtos/request/disease.post.dto";
import { mockDisease } from "../stub/disease.stub";
import { PatchDiseaseRequestDto } from "../dtos/request/disease.patch.dto";

describe('DiseaseController', () => {
  let controller: DiseaseManagementController;
  let service: jest.Mocked<DiseaseManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseManagementController).compile();
    controller = unit;
    service = unitRef.get(DiseaseManagementService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostDiseaseRequestDto = {
      name: 'New Disease',
      group: 1
    };
    const mockedDisease = mockDisease();

    it('should call the service to create a new disease', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedDisease);

      // Act
      await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedDisease = mockDisease();
    const expectedData = mockedDisease;

    it('should call the service to update a disease', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchDiseaseRequestDto = {
      name: 'Updated Disease',
    };
    const mockedDisease = mockDisease();

    it('should call the service to update a disease', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedDisease);

      // Act
      await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should call the service to delete a disease', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
    });
  });
});