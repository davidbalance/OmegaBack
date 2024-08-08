import { TestBed } from "@automock/jest";
import { JobPositionManagementService } from "../services/job-position-management.service";
import { JobPositionManagementController } from "./job-position-management.controller";
import { PostJobPositionRequestDto } from "../dtos/request/post.job-position.request.dto";
import { mockJobPosition, mockJobPositions } from "../services/test/stub/job-position.stub";
import { PatchJobPositionRequestDto } from "../dtos/request/patch.job-position.request.dto";

describe('JobPositionManagementController', () => {
  let controller: JobPositionManagementController;
  let service: jest.Mocked<JobPositionManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionManagementController).compile();

    controller = unit;
    service = unitRef.get(JobPositionManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const body: PostJobPositionRequestDto = {
      name: 'Job Position Name'
    };
    const mockedJobPosition = mockJobPosition();

    it('should create a job position', async () => {
      // Arrange
      service.create.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await controller.create(body);

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(service.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    const mockedJobPositions = mockJobPositions();

    it('should return all job positions', async () => {
      // Arrange
      service.findAll.mockResolvedValueOnce(mockedJobPositions);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual({
        data: mockedJobPositions
      });
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedJobPosition = mockJobPosition();

    it('should return a job position by id', async () => {
      // Arrange
      service.findOne.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await controller.findOne(id.toString());

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const id = 1;
    const body: PatchJobPositionRequestDto = {
      name: 'Updated Job Position Name'
    };
    const mockedJobPosition = mockJobPosition();

    it('should update a job position', async () => {
      // Arrange
      service.updateOne.mockResolvedValueOnce(mockedJobPosition);

      // Act
      const result = await controller.update(id.toString(), body);

      // Assert
      expect(result).toEqual(mockedJobPosition);
      expect(service.updateOne).toHaveBeenCalledWith(id, body);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should delete a job position', async () => {
      // Arrange
      service.deleteOne.mockResolvedValueOnce(undefined);

      // Act
      const result = await controller.remove(id.toString());

      // Assert
      expect(result).toEqual({});
      expect(service.deleteOne).toHaveBeenCalledWith(id);
    });
  });
});