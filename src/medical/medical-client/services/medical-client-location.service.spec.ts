import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../repositories/medical-client.repository";
import { MedicalClientLocationService } from "./medical-client-location.service";
import { MedicalClientManagementAreaRequestDto } from "../dtos/request/medical-client-management-area.base.dto";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";

describe('MedicalClientLocationService', () => {
  let service: MedicalClientLocationService;
  let repository: jest.Mocked<MedicalClientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientLocationService).compile();

    service = unit;
    repository = unitRef.get(MedicalClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('assignManagementAndArea', () => {
    it('should assign management and area to a medical client', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: MedicalClientManagementAreaRequestDto = {
        managementId: 1,
        managementName: "Test name",
        areaId: 2,
        areaName: "Test name"
      };
      const mockedClient = mockMedicalClientEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedClient);

      // Act
      const result = await service.assignManagementAndArea(dni, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni: dni }, { ...mockDto });
      expect(result).toEqual(mockedClient);
    });
  });
});
