import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionManagementService } from "./job-position-management.service";
import { mockJobPositionEntities } from "../stub/job-position-entity.stub";

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

  describe('find', () => {
    it('should return an array of JobPosition', async () => {
      // Arrange
      const mockedJobPosition = mockJobPositionEntities();
      repository.find.mockResolvedValue(mockedJobPosition);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockedJobPosition);
    });
  });
});