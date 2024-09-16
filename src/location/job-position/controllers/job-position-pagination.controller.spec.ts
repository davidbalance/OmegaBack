import { TestBed } from "@automock/jest";
import { JobPositionPaginationService } from "../services/job-position-pagination.service";
import { JobPositionPaginationController } from "./job-position-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockJobPositions } from "../stub/job-position.stub";

describe('JobPositionPaginationController', () => {
  let controller: JobPositionPaginationController;
  let service: jest.Mocked<JobPositionPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionPaginationController).compile();
    controller = unit;
    service = unitRef.get(JobPositionPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockJobPositions();
    const expectedData = { data: mockedExams };

    it('should call the service to find an job position', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count job positions', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });
});