import { TestBed } from "@automock/jest";
import { DiseaseGroupManagementController } from "./disease-group-management.controller";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { PatchDiseaseGroupRequestDto } from "../dtos/request/disease-group.patch.request.dto";
import { PostDiseaseGroupRequestDto } from "../dtos/request/disease-group.post.request.dto";
import { mockDiseaseGroup } from "../stub/disease-group.stub";

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

  describe('create', () => {
    const mockDto: PostDiseaseGroupRequestDto = {
      name: 'New Disease Group',
    };
    const mockedDiseaseGroup = mockDiseaseGroup();

    it('should call the service to create a new disease group', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedDiseaseGroup);

      // Act
      await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedDiseaseGroup = mockDiseaseGroup();
    const expectedData = mockedDiseaseGroup;

    it('should call the service to update a disease group', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedDiseaseGroup);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchDiseaseGroupRequestDto = {
      name: 'Updated Disease Group',
    };
    const mockedDiseaseGroup = mockDiseaseGroup();

    it('should call the service to update a disease group', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedDiseaseGroup);

      // Act
      await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
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