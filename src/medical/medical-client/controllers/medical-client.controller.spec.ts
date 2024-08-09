import { TestBed } from "@automock/jest";
import { MedicalClientManagementService } from "../services/medical-client-management.service";
import { MedicalClientManagementController } from "./medical-client.controller";
import { mockMedicalClients } from "../services/test/stub/medical-client.stub";
import { GetMedicalClientArrayResponseDto } from "../dtos/response/get.medical-client-array.response.dto";

describe('MedicalClientManagementController', () => {
  let controller: MedicalClientManagementController;
  let service: jest.Mocked<MedicalClientManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientManagementController).compile();

    controller = unit;
    service = unitRef.get(MedicalClientManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findMedicalClientsByDoctorDni', () => {
    const doctorDni: string = '1234567890';
    const mockedClients = mockMedicalClients();
    const expectedResult: GetMedicalClientArrayResponseDto = { data: mockedClients };

    it('should return all medical clients for the given doctor dni', async () => {
      // Arrange
      service.findClientsByDoctor.mockResolvedValueOnce(mockedClients);

      // Act
      const result = await controller.findMedicalClientsByDoctorDni(doctorDni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findClientsByDoctor).toHaveBeenCalledWith(doctorDni);
    });
  });
});