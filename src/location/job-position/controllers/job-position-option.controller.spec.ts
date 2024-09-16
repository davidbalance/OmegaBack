import { TestBed } from "@automock/jest";
import { JobPositionManagementService } from "../services/job-position-management.service";
import { JobPositionOptionController } from "./job-position-option.controller";
import { mockJobPositions } from "../stub/job-position.stub";

describe('JobPositionOptionController', () => {
  let controller: JobPositionOptionController;
  let service: jest.Mocked<JobPositionManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionOptionController).compile();
    controller = unit;
    service = unitRef.get(JobPositionManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedJobPosition = mockJobPositions();
    const expectedData = { data: mockedJobPosition };

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedJobPosition);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });
});