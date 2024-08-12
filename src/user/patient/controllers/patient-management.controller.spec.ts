import { TestBed } from "@automock/jest";
import { PatientManagementService } from "../service/patient-management.service";
import { PatientManagementController } from "./patient-management.controller";
import { mockFlatPatientArray } from "../service/test/stub/patient-flat.stub";
import { GetPatientArrayResponseDto } from "../dtos/response/get.patient-array.response.dto";

describe('PatientManagementController', () => {
  let controller: PatientManagementController;
  let service: jest.Mocked<PatientManagementService>;
  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientManagementController).compile();

    controller = unit;
    service = unitRef.get(PatientManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedData = mockFlatPatientArray();
    const expectedResult: GetPatientArrayResponseDto = { data: mockedData };

    it('should find all patients', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedData);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findByCompany', () => {
    const mockedRuc = '1234567890';
    const mockedData = mockFlatPatientArray();
    const expectedResult: GetPatientArrayResponseDto = { data: mockedData };

    it('should find patients by company', async () => {
      // Arrange
      service.findByExtraAttribute.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findByCompany(mockedRuc);

      // Assert
      expect(service.findByExtraAttribute).toHaveBeenCalledWith('employee_of', mockedRuc);
      expect(result).toEqual(expectedResult);
    });
  });
});