import { TestBed } from "@automock/jest";
import { AreaManagementService } from "../services/area-management.service";
import { AreaManagementController } from "./area-management.controller";
import { mockArea, mockAreas } from "../services/test/stub/area.stub";
import { GetAreaArrayResponseDto } from "../dtos/response/get.area-array.response.dto";
import { PostAreaRequestDto } from "../dtos/request/post.area.request.dto";
import { PostAreaResponseDto } from "../dtos/response/post.area.response.dto";
import { PatchAreaRequestDto } from "../dtos/request/patch.area.request.dto";
import { PatchAreaResponseDto } from "../dtos/response/patch.area.response.dto";

describe('AreaManagementController', () => {
  let controller: AreaManagementController;
  let service: jest.Mocked<AreaManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaManagementController).compile();

    controller = unit;
    service = unitRef.get(AreaManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    const mockData = mockAreas();
    const mockResponse: GetAreaArrayResponseDto = {
      data: mockData
    };

    it('should call the service to find all areas', async () => {
      // Arrange
      service.find.mockResolvedValue(mockData);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    const mockDto: PostAreaRequestDto = {
      name: 'New Area',
      management: 1
    };
    const mockAreaData = mockArea();
    const mockResponse: PostAreaResponseDto = mockAreaData;

    it('should call the service to create a new area', async () => {
      // Arrange
      service.create.mockResolvedValue(mockAreaData);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOneAndUpdate', () => {
    const id = 1;
    const mockDto: PatchAreaRequestDto = {
      name: 'Updated Area',
      management: 1
    };
    const mockAreaData = mockArea();
    const mockResponse: PatchAreaResponseDto = mockAreaData;

    it('should call the service to update an area', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockAreaData);

      // Act
      const result = await controller.findOneAndUpdate(id.toString(), mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(+id, mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOneAndDelete', () => {
    const id = 1;
    it('should call the service to delete an area', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndDelete(id.toString());

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual({});
    });
  });

});