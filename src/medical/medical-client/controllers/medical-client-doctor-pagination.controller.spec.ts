import { TestBed } from "@automock/jest";
import { MedicalClientDoctorPaginationService } from "../services/medical-client-doctor-pagination.service";
import { MedicalClientDoctorPaginationController } from "./medical-client-doctor-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockMedicalClients } from "../stub/medical-client.stub";

describe('MedicalClientDoctorPaginationController', () => {
  let controller: MedicalClientDoctorPaginationController;
  let service: jest.Mocked<MedicalClientDoctorPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientDoctorPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalClientDoctorPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const doctor: string = "1234567890";
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockMedicalClients();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(doctor, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, doctor);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const doctor: string = "1234567890";
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(doctor, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, doctor);
      expect(result).toEqual(expectedData);
    });
  });
});