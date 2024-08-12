import { TestBed } from "@automock/jest";
import { MedicalClientLocationService } from "../services/medical-client-location.service";
import { MedicalClientLocationController } from "./medical-client-location.controller";
import { MedicalClientManagementService } from "../services/medical-client-management.service";
import { mockMedicalClient } from "../services/test/stub/medical-client.stub";
import { GetMedicalClientManagementAreaResponseDto } from "../dtos/response/get.medical-client-management-area.response.dto";
import { PostMedicalClientManagementAndAreaRequestDto } from "../dtos/request/post.medical-client-management-area.request.dto";
import { PostMedicalClientManagementAreaResponseDto } from "../dtos/response/post.medical-client-management-area.response.dto";

describe('MedicalClientLocationController', () => {
  let controller: MedicalClientLocationController;
  let service: jest.Mocked<MedicalClientLocationService>;
  let clientService: jest.Mocked<MedicalClientManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientLocationController).compile();

    controller = unit;
    service = unitRef.get(MedicalClientLocationService);
    clientService = unitRef.get(MedicalClientManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOneClientByDniAndReturnManagementAndArea', () => {
    const dni: string = '1234567890';
    const mockedMedicalClient = mockMedicalClient();
    const expectedResult: GetMedicalClientManagementAreaResponseDto = mockedMedicalClient;

    it('should return the client with management and area data for the given dni', async () => {
      // Arrange
      clientService.findOneByDni.mockResolvedValueOnce(mockedMedicalClient);

      // Act
      const result = await controller.findOneClientByDniAndReturnManagementAndArea(dni);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(clientService.findOneByDni).toHaveBeenCalledWith(dni);
    });
  });

  describe('assignManagementAndArea', () => {
    const dni: string = '1234567890';
    const body: PostMedicalClientManagementAndAreaRequestDto = {
      managementId: 1,
      managementName: 'Test Management',
      areaId: 2,
      areaName: 'Test Area'
    };
    const mockedMedicalClient = mockMedicalClient();
    const expectedResult: PostMedicalClientManagementAreaResponseDto = mockedMedicalClient;

    it('should assign management and area to the client', async () => {
      // Arrange
      service.assignManagementAndArea.mockResolvedValueOnce(mockedMedicalClient);

      // Act
      const result = await controller.assignManagementAndArea(dni, body);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.assignManagementAndArea).toHaveBeenCalledWith(dni, body);
    });
  });

  describe('removeManagementAndArea', () => {
    const dni: string = '1234567890';

    it('should remove management and area from the client', async () => {
      // Arrange
      service.removeManagementAndArea.mockResolvedValueOnce(undefined);

      // Act
      const result = await controller.removeManagementAndArea(dni);

      // Assert
      expect(result).toEqual({});
      expect(service.removeManagementAndArea).toHaveBeenCalledWith(dni);
    });
  });
});