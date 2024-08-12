import { TestBed } from "@automock/jest";
import { MedicalClientJobPositionService } from "../services/medical-client-job-position.service";
import { MedicalClientJobPositionController } from "./medical-client-job-position.controller";
import { GetMedicalClientJobPositionResponseDto } from "../dtos/response/get.medical-client-job-position.response.dto";
import { mockMedicalClient } from "../services/test/stub/medical-client.stub";
import { PatchMedicalClientJobPositionRequestDto } from "../dtos/request/patch.medical-client-job-position.request.dto";
import { PatchMedicalClientJobPositionResponseDto } from "../dtos/response/patch.medical-client-job-position.response.dto";

describe('MedicalClientJobPositionController', () => {
  let controller: MedicalClientJobPositionController;
  let service: jest.Mocked<MedicalClientJobPositionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientJobPositionController).compile();

    controller = unit;
    service = unitRef.get(MedicalClientJobPositionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findJobPosition', () => {
    const dni: string = '1234567890';
    const mockedMedicalClient = mockMedicalClient();
    const expectedResult: GetMedicalClientJobPositionResponseDto = mockedMedicalClient;

    it('should return the job position for the given dni', async () => {
      // Arrange
      service.findOnePosition.mockResolvedValueOnce(mockedMedicalClient);

      // Act
      const result = await controller.findJobPosition(dni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findOnePosition).toHaveBeenCalledWith(dni);
    });
  });

  describe('assignJobPosition', () => {
    const dni: string = '1234567890';
    const body: PatchMedicalClientJobPositionRequestDto = {
      jobPositionName: "Test position"
    };
    const mockedMedicalClient = mockMedicalClient();
    const expectedResult: PatchMedicalClientJobPositionResponseDto = mockedMedicalClient

    it('should assign the job position to the client', async () => {
      // Arrange
      service.assignJobPosition.mockResolvedValueOnce(mockedMedicalClient);

      // Act
      const result = await controller.assignJobPosition(dni, body);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.assignJobPosition).toHaveBeenCalledWith(dni, body);
    });
  });
});