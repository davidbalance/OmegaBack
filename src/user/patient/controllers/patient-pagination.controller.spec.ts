import { TestBed } from "@automock/jest";
import { PatientPaginationService } from "../service/patient-pagination.service";
import { PatientPaginationController } from "./patient-pagination.controller";
import { mockPatients } from "../stub/patient.stub";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";

describe('PatientPaginationController', () => {
  let controller: PatientPaginationController;
  let service: jest.Mocked<PatientPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientPaginationController).compile();
    controller = unit;
    service = unitRef.get(PatientPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedPatients = mockPatients();
    const expectedData = { data: mockedPatients };

    it('should call the service to find an patient', async () => {
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

    it('should call the service to count patients', async () => {
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