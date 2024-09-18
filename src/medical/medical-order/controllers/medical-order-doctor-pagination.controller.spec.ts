import { TestBed } from "@automock/jest";
import { MedicalOrderDoctorPaginationService } from "../services/medical-order-doctor-pagination.service";
import { MedicalOrderDoctorPaginationController } from "./medical-order-doctor-pagination.controller";
import { mockMedicalOrderDoctors } from "../stubs/medical-order-doctor.stub";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";

describe('MedicalOrderDoctorPaginationController', () => {
  let controller: MedicalOrderDoctorPaginationController;
  let service: jest.Mocked<MedicalOrderDoctorPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderDoctorPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderDoctorPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const doctor: string = '1234567890';
    const patient: string = '1234567890';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockMedicalOrderDoctors();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(patient, doctor, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, { doctor, patient });
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const doctor: string = '1234567890';
    const patient: string = '1234567890';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(patient, doctor, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, { doctor, patient });
      expect(result).toEqual(expectedData);
    });
  });
});