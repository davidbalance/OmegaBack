import { TestBed } from "@automock/jest";
import { AreaManagementService } from "../services/area-management.service";
import { AreaManagementController } from "./area-management.controller";
import { PostAreaRequestDto } from "../dtos/request/area.post.request.dto";
import { mockArea, mockAreas } from "../stub/area.stub";
import { PatchAreaRequestDto } from "../dtos/request/area.patch.dto";

describe('AreaManagementController', () => {
  let controller: AreaManagementController;
  let service: jest.Mocked<AreaManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaManagementController).compile();
    controller = unit;
    service = unitRef.get(AreaManagementService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostAreaRequestDto = {
      name: 'New Disease',
      management: 1
    };
    const mockedArea = mockArea();

    it('should call the service to create a new area', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedArea);

      // Act
      await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedArea = mockArea();
    const expectedData = mockedArea;

    it('should call the service to find one area', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedArea);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchAreaRequestDto = {
      name: 'Updated Disease',
    };
    const mockedArea = mockArea();

    it('should call the service to update a area', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedArea);

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