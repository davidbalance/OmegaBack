import { TestBed } from "@automock/jest";
import { MedicalClientLocationService } from "../services/medical-client-location.service";
import { MedicalClientManagementService } from "../services/medical-client-management.service";
import { MedicalClientLocationController } from "./medical-client-location.controller";
import { mockMedicalClient } from "../stub/medical-client.stub";
import { PatchMedicalClientManagementAreaRequestDto } from "../dtos/request/medical-client-management-area.patch.dto";

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
    it('should find a client by DNI and return its management and area', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedClient = mockMedicalClient();
      clientService.findOneByDni.mockResolvedValue(mockedClient);

      // Act
      const result = await controller.findOneClientByDniAndReturnManagementAndArea(dni);

      // Assert
      expect(clientService.findOneByDni).toHaveBeenCalledWith(dni);
      expect(result).toEqual(mockedClient);
    });
  });

  describe('assignManagementAndArea', () => {
    it('should assign management and area to a client', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: PatchMedicalClientManagementAreaRequestDto = {
        managementId: 1,
        managementName: "Test name",
        areaId: 2,
        areaName: "Test name"
      };
      service.assignManagementAndArea.mockResolvedValue(undefined);

      // Act
      const result = await controller.assignManagementAndArea(dni, mockDto);

      // Assert
      expect(service.assignManagementAndArea).toHaveBeenCalledWith(dni, mockDto);
      expect(result).toEqual({});
    });
  });
});