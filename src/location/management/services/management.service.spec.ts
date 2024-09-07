import { TestBed } from "@automock/jest";
import { ManagementRepository } from "../../repositories/management.repository";
import { ManagementService } from "../management.service";
import { PostManagementRequestDto } from "../../dtos/request/management.post.dto";
import { mockManagement, mockManagements } from "../../stub/management.stub";
import { PatchMagementRequestDto } from "../../dtos/request/management.patch.dto";

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
    const mockedManagement = mockManagement();
    const body: PostManagementRequestDto = {
      name: "Management Name"
    }

    it('should create a management', async () => {
      // Arrange
      repository.create.mockResolvedValueOnce(mockedManagement);

      // Act
      const result = await service.create(body);

      // Assert
      expect(result).toEqual(mockedManagement);
      expect(repository.create).toHaveBeenCalledWith(body);
    });
  });

  describe('find', () => {
    const mockedManagements = mockManagements();

    it('should return all managements', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedManagements);

      // Act
      const result = await service.find();

      // Assert
      expect(result).toEqual(mockedManagements);
      expect(repository.find).toHaveBeenCalledWith({
        where: { status: true },
        relations: { areas: true }
      });
    });
  });

  describe('findOneById', () => {
    const id: number = 1;
    const mockedManagement = mockManagement();

    it('should return a management by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedManagement);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedManagement);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedManagement = mockManagement();
    const body: PatchMagementRequestDto = {
      name: "Updated Management Name"
    }

    it('should update a management', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedManagement);

      // Act
      const result = await service.updateOne(id, body);

      // Assert
      expect(result).toEqual(mockedManagement);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, body);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a management', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });
});