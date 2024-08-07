import { TestBed } from "@automock/jest";
import { DiseaseManagementService } from "../services/disease-management.service";
import { DiseaseController } from "./disease-management.controller";
import { GetDiseaseArrayResponseDto } from "../dtos/response/get.disease-array.response.dto";
import { Disease } from "../entities/disease.entity";
import { PostDiseaseRequestDto } from "../dtos/request/post.disease.request.dto";
import { PostDiseaseResponseDto } from "../dtos/response/post.disease.response.dto";
import { PatchDiseaseRequestDto } from "../dtos/request/patch.disease.request.dto";
import { PatchDiseaseResponseDto } from "../dtos/response/patch.disease.response.dto";

describe('DiseaseController', () => {
  let controller: DiseaseController;
  let service: jest.Mocked<DiseaseManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseController).compile();

    controller = unit;
    service = unitRef.get(DiseaseManagementService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockData: Disease[] = [{
      id: 1,
      name: 'Disease 1',
      status: false,
      group: undefined,
      createAt: new Date(),
      updateAt: new Date()
    }];
    const mockResponse: GetDiseaseArrayResponseDto = { data: mockData };

    it('should call the service to find all diseases', async () => {
      // Arrange
      service.find.mockResolvedValue(mockData);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    const mockDto: PostDiseaseRequestDto = {
      name: 'New Disease',
      group: 1
    };
    const mockDisease: Disease = {
      id: 1,
      ...mockDto,
      group: undefined,
      status: false,
      createAt: undefined,
      updateAt: undefined
    };
    const mockResponse: PostDiseaseResponseDto = mockDisease;

    it('should call the service to create a new disease', async () => {
      // Arrange
      service.create.mockResolvedValue(mockDisease);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOneAndUpdate', () => {
    const id = 1;
    const mockDto: PatchDiseaseRequestDto = {
      name: 'Updated Disease',
    };
    const mockDisease: Disease = {
      id,
      name: mockDto.name,
      group: undefined,
      status: false,
      createAt: new Date(),
      updateAt: new Date()
    };
    const mockResponse: PatchDiseaseResponseDto = mockDisease;

    it('should call the service to update a disease', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockDisease);

      // Act
      const result = await controller.findOneAndUpdate(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOneAndDelete', () => {
    const id = 1;

    it('should call the service to delete a disease', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndDelete(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });
});