import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../../repositories/job-position.repository";
import { JobPositionManagementService } from "../job-position-management.service";
import { mockJobPosition, mockJobPositions } from "./stub/job-position.stub";
import { PostJobPositionRequestDto } from "../../dtos/request/post.job-position.request.dto";
import { PatchJobPositionRequestDto } from "../../dtos/request/patch.job-position.request.dto";

describe('JobPositionManagementService', () => {
  let service: JobPositionManagementService;
  let repository: jest.Mocked<JobPositionRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionManagementService).compile();

    service = unit;
    repository = unitRef.get(JobPositionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedJobPosition = mockJobPosition();
    const body: PostJobPositionRequestDto = {
      name: "Job Position Name",
    }

    it('should create a job position', async () => {
      // Arrange
      repository.create.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await service.create(body);

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(repository.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    const mockedJobPositions = mockJobPositions();

    it('should return all job positions', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedJobPositions);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockedJobPositions);
      expect(repository.find).toHaveBeenCalledWith({ where: { status: true } });
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();

    it('should return a job position by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();
    const body: PatchJobPositionRequestDto = {
      name: "Updated Job Position Name"
    }

    it('should update a job position', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await service.updateOne(id, body);

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, body);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a job position', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});