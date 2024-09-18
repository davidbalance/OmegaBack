import { TestBed } from "@automock/jest";
import { MedicalResultDoctorPaginationService } from "../services/medical-result-doctor-pagination.service";
import { MedicalResultDoctorPaginationController } from "./medical-result-doctor-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockMedicalResults } from "../stub/medical-result.stub";

describe('MedicalResultDoctorPaginationController', () => {
  let controller: MedicalResultDoctorPaginationController;
  let service: jest.Mocked<MedicalResultDoctorPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultDoctorPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalResultDoctorPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const order: number = 1;
    const doctor: string = '1234567890';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockMedicalResults();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(order, doctor, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, { order, doctor });
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const order: number = 1;
    const doctor: string = '1234567890';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(order, doctor, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, { order, doctor });
      expect(result).toEqual(expectedData);
    });
  });
});