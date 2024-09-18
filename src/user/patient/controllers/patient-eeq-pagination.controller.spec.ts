import { TestBed } from "@automock/jest";
import { PatientEeqPaginationService } from "../service/patient-eeq-pagination.service";
import { PatientEeqPaginationController } from "./patient-eeq-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockEeqPatients } from "../stub/eeq-patient.stub";

describe('PatientEeqPaginationController', () => {
  let controller: PatientEeqPaginationController;
  let service: jest.Mocked<PatientEeqPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientEeqPaginationController).compile();
    controller = unit;
    service = unitRef.get(PatientEeqPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedPatients = mockEeqPatients();
    const expectedData = { data: mockedPatients };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedPatients);

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

    it('should call the service to count areas', async () => {
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