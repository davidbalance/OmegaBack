import { TestBed } from "@automock/jest";
import { PatientLookForCompanyPaginationService } from "../service/patient-look-for-company-pagination.service";
import { PatientLookForCompanyPaginationController } from "./patient-look-for-company-pagination.controller";
import { mockPatients } from "../stub/patient.stub";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";

describe('PatientLookForCompanyPaginationController', () => {
  let controller: PatientLookForCompanyPaginationController;
  let service: jest.Mocked<PatientLookForCompanyPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientLookForCompanyPaginationController).compile();
    controller = unit;
    service = unitRef.get(PatientLookForCompanyPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const ruc: string = '1234567890001';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedPatients = mockPatients();
    const expectedData = { data: mockedPatients };

    it('should call the service to find an patient', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedPatients);

      // Act
      const result = await controller.find(ruc, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, { value: ruc, name: 'employee_of' });
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const ruc: string = '1234567890001';
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count patients', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(ruc, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, { value: ruc, name: 'employee_of' });
      expect(result).toEqual(expectedData);
    });
  });
});