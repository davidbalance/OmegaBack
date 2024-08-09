import { TestBed } from "@automock/jest";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { MedicalOrderManagementController } from "./medical-order-management.controller";
import { mockMedicalOrders } from "../services/test/stub/medical-order.stub";
import { GetMedicalOrderArrayResponseDto } from "../dtos/response/get.medical-order-array.response.dto";

describe('MedicalOrderManagementController', () => {
  let controller: MedicalOrderManagementController;
  let service: jest.Mocked<MedicalOrderManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByPatient', () => {
    const patientDni: string = '1234567890';
    const mockedOrders = mockMedicalOrders();
    const expectedResult: GetMedicalOrderArrayResponseDto = { data: mockedOrders as any };

    it('should return all medical orders for the given patient dni', async () => {
      // Arrange
      service.findAllByPatient.mockResolvedValueOnce(mockedOrders);

      // Act
      const result = await controller.findByPatient(patientDni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findAllByPatient).toHaveBeenCalledWith(patientDni);
    });
  });

  describe('findByPatientAndDoctor', () => {
    const patientDni: string = '1234567890';
    const doctorDni: string = '9876543210';
    const mockedOrders = mockMedicalOrders();
    const expectedResult: GetMedicalOrderArrayResponseDto = { data: mockedOrders as any };

    it('should return all medical orders for the given patient and doctor dni', async () => {
      // Arrange
      service.findAllByPatientAndDoctor.mockResolvedValueOnce(mockedOrders);

      // Act
      const result = await controller.findByPatientAndDoctor(patientDni, doctorDni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findAllByPatientAndDoctor).toHaveBeenCalledWith(patientDni, doctorDni);
    });
  });
});