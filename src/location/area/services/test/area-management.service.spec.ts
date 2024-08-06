import { TestBed } from "@automock/jest";
import { AreaRepository } from "../../repositories/area.repository";
import { AreaManagementService } from "../area-management.service";
import { ManagementService } from "@/location/management/services/management.service";
import { mockArea, mockAreas } from "./stub/area.stub";
import { mockManagement } from "@/location/management/services/test/stub/management.stub";
import { PatchAreaRequestDto } from "../../dtos/request/patch.area.request.dto";
import { PostAreaRequestDto } from "../../dtos/request/post.area.request.dto";

describe('AreaManagementService', () => {
  let service: AreaManagementService;
  let repository: jest.Mocked<AreaRepository>;
  let managementService: jest.Mocked<ManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaManagementService).compile();

    service = unit;
    repository = unitRef.get(AreaRepository);
    managementService = unitRef.get(ManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostAreaRequestDto = {
      name: 'New Area',
      management: 1
    }
    const mockedArea = mockArea();
    const mockedManagement = mockManagement();

    it('should create a new area', async () => {
      // Arrange
      managementService.findOneById.mockResolvedValue(mockedManagement);
      repository.create.mockResolvedValue(mockedArea);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(managementService.findOneById).toHaveBeenCalledWith(mockDto.management);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, management: mockedManagement });
      expect(result).toEqual(mockedArea);
    });
  });

  describe('find', () => {
    const mockedAreas = mockAreas();

    it('should find all areas', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedAreas);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockedAreas);
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockDto: PatchAreaRequestDto = {
      name: "mocked-name",
      management: 1
    }
    const mockedArea = mockArea();
    const mockedManagement = mockManagement();

    it('should update an area', async () => {
      // Arrange
      managementService.findOneById.mockResolvedValue(mockedManagement);
      repository.findOneAndUpdate.mockResolvedValue(mockedArea);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(managementService.findOneById).toHaveBeenCalledWith(mockDto.management);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, management: mockedManagement });
      expect(result).toEqual(mockedArea);
    });

  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an area', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});