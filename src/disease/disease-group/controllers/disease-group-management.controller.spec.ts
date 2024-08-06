import { TestBed } from "@automock/jest";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { DiseaseGroupManagementController } from "./disease-group-management.controller";
import { GetDiseaseGroupArrayResponseDto } from "../dtos/response/get.disease-group-array.response.dto";
import { DiseaseGroup } from "../entities/disease-group.entity";
import { PostDiseaseGroupRequestDto } from "../dtos/request/post.disease-group.request.dto";
import { PostDiseaseGroupResponseDto } from "../dtos/response/post.disease-group.response.dto";
import { PatchDiseaseGroupRequestDto } from "../dtos/request/patch.disease-group.request.dto";
import { PatchDiseaseGroupResponseDto } from "../dtos/response/patch.disease-group.response.dto";

describe('DiseaseGroupManagementController', () => {
  let controller: DiseaseGroupManagementController;
  let service: jest.Mocked<DiseaseGroupManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupManagementController).compile();

    controller = unit;
    service = unitRef.get(DiseaseGroupManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockData: DiseaseGroup[] = [{
      id: 1,
      name: 'Disease Group 1',
      status: false,
      diseases: [],
      createAt: new Date(),
      updateAt: new Date()
    }];
    const mockResponse: GetDiseaseGroupArrayResponseDto = {
      data: mockData
    };

    it('should call the service to find all disease groups', async () => {
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
    const mockDto: PostDiseaseGroupRequestDto = {
      name: 'New Disease Group',
    };
    const mockDiseaseGroup: DiseaseGroup = {
      id: 1,
      ...mockDto,
      status: false,
      diseases: [],
      createAt: new Date(),
      updateAt: new Date()
    };
    const mockResponse: PostDiseaseGroupResponseDto = mockDiseaseGroup;

    it('should call the service to create a new disease group', async () => {
      // Arrange
      service.create.mockResolvedValue(mockDiseaseGroup);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchDiseaseGroupRequestDto = {
      name: 'Updated Disease Group',
    };
    const mockDiseaseGroup: DiseaseGroup = {
      id,
      name: mockDto.name,
      status: false,
      diseases: [],
      createAt: new Date(),
      updateAt: new Date()
    };
    const mockResponse: PatchDiseaseGroupResponseDto = mockDiseaseGroup;

    it('should call the service to update a disease group', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockDiseaseGroup);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should call the service to delete a disease group', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });

});