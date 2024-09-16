import { TestBed } from "@automock/jest";
import { ManagementRepository } from "../repositories/management.repository";
import { ManagementService } from "./management.service";
import { ManagementRequestDto } from "../dtos/request/management.base.dto";
import { mockManagementEntity } from "../stub/management-entity.stub";

describe('ManagementService', () => {
  let service: ManagementService;
  let repository: jest.Mocked<ManagementRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementService).compile();

    service = unit;
    repository = unitRef.get(ManagementRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a management', async () => {
      // Arrange
      const mockDto: ManagementRequestDto = { name: 'Test Management' };
      const mockedData = mockManagementEntity();
      repository.create.mockResolvedValue(mockedData);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockedData);
    });
  });

  describe('findOne', () => {
    it('should find a management by ID', async () => {
      // Arrange
      const id = 1;
      const mockedData = mockManagementEntity();
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
      expect(result).toEqual(mockedData);
    });
  });

  describe('hasAreas', () => {
    const id = 1;
    const mockedData = mockManagementEntity();

    it('should return true if the management has areas', async () => {
      // Arrange
      repository.findOne.mockResolvedValue({ ...mockedData, areas: [{ id: 1 } as any] });

      // Act
      const result = await service.hasAreas(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id }, relations: { areas: true } });
      expect(result).toBe(true);
    });

    it('should return false if the management has no areas', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.hasAreas(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id }, relations: { areas: true } });
      expect(result).toBe(false);
    });
  });

  describe('updateOne', () => {
    it('should update a management', async () => {
      // Arrange
      const id = 1;
      const mockDto: ManagementRequestDto = { name: 'Updated Management' };
      const mockedData = mockManagementEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedData);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
      expect(result).toEqual(mockedData);
    });
  });

  describe('deleteOne', () => {
    it('should delete a management', async () => {
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
