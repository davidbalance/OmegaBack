import { TestBed } from "@automock/jest";
import { DoctorPaginationService } from "../services/doctor-pagination.service";
import { DoctorPaginationController } from "./doctor-pagination.controller";
import { mockDoctors } from "../stub/doctor.stub";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";

describe('DoctorPaginationController', () => {
  let controller: DoctorPaginationController;
  let service: jest.Mocked<DoctorPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorPaginationController).compile();
    controller = unit;
    service = unitRef.get(DoctorPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedDoctor = mockDoctors();
    const expectedData = { data: mockedDoctor };

    it('should call the service to find an doctor', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedDoctor);

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

    it('should call the service to count doctors', async () => {
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