import { TestBed } from "@automock/jest";
import { ManagementService } from "../services/management.service";
import { ManagementController } from "./management.controller";
import { PostManagementRequestDto } from "../dtos/request/management.post.dto";
import { mockManagement } from "../stub/management.stub";
import { PatchMagementRequestDto } from "../dtos/request/management.patch.dto";

describe('ManagementController', () => {
  let controller: ManagementController;
  let service: jest.Mocked<ManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementController).compile();
    controller = unit;
    service = unitRef.get(ManagementService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostManagementRequestDto = { name: 'New Disease' };
    const mockedDisease = mockManagement();

    it('should call the service to create a new management', async () => {
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
    const mockedDisease = mockManagement();
    const expectedData = mockedDisease;

    it('should call the service to find one management', async () => {
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
    const mockDto: PatchMagementRequestDto = {
      name: 'Updated Disease',
    };
    const mockedDisease = mockManagement();

    it('should call the service to update a management', async () => {
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