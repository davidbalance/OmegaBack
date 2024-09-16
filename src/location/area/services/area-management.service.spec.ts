import { ManagementService } from "@/location/management/services/management.service";
import { AreaRepository } from "../repositories/area.repository";
import { AreaManagementService } from "./area-management.service";
import { TestBed } from "@automock/jest";
import { AreaRequestDto } from "../dtos/request/area.base.dto";
import { mockAreaEntity } from "../stub/area-entity.stub";
import { mockManagement } from "@/location/management/stub/management.stub";

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
    it('should create an area', async () => {
      // Arrange
      const mockDto: AreaRequestDto = {
        name: 'New Area',
        management: 1,
      };
      const mockedAreaData = mockAreaEntity();
      const mockedManagement = mockManagement();
      const expectedData = { ...mockedAreaData, management: mockDto.management };
      managementService.findOne.mockResolvedValue(mockedManagement);
      repository.create.mockResolvedValue(mockedAreaData);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(managementService.findOne).toHaveBeenCalledWith(mockDto.management);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, management: mockedManagement });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    it('should find an area by ID', async () => {
      // Arrange
      const id = 1;
      const mockedAreaData = mockAreaEntity();
      const expectedData = { ...mockedAreaData, management: mockedAreaData.management.id };
      repository.findOne.mockResolvedValue(mockedAreaData);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { management: true } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: Partial<AreaRequestDto> = {
      name: 'Updated Area',
      management: 2,
    };
    const mockedAreaData = mockAreaEntity();
    const mockedManagement = mockManagement();
    const expectedData = { ...mockedAreaData, management: mockedAreaData.management.id };

    it('should update an area with a new management', async () => {
      // Arrange
      managementService.findOne.mockResolvedValue(mockedManagement);
      repository.findOneAndUpdate.mockResolvedValue(mockedAreaData);
      repository.findOne.mockResolvedValue(mockedAreaData);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(managementService.findOne).toHaveBeenCalledWith(mockDto.management);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, management: mockedManagement });
      expect(result).toEqual(expectedData);
    });

    it('should update an area without changing the management', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue(mockedAreaData);
      repository.findOne.mockResolvedValue(mockedAreaData);
      const { management, ...mockDtoWithoutManagement } = mockDto;
      // Act
      const result = await service.updateOne(id, mockDtoWithoutManagement);

      // Assert
      expect(managementService.findOne).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDtoWithoutManagement });
      expect(result).toEqual(expectedData);
    });
  });

  describe('deleteOne', () => {
    it('should delete an area', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});