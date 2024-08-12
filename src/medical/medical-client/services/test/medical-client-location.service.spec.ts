import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../../repositories/medical-client.repository";
import { MedicalClientLocationService } from "../medical-client-location.service";
import { PostMedicalClientManagementAndAreaRequestDto } from "../../dtos/request/post.medical-client-management-area.request.dto";
import { mockMedicalClient } from "./stub/medical-client.stub";

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
    const dni: string = '1234567890';
    const newLocation: PostMedicalClientManagementAndAreaRequestDto = {
      managementId: 1,
      managementName: 'Test Management',
      areaId: 2,
      areaName: 'Test Area'
    };
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should assign management and area to the client', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.assignManagementAndArea(dni, newLocation);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni }, { ...newLocation });
    });
  });

  describe('removeManagementAndArea', () => {
    const dni: string = '1234567890';
    const mockedClient = mockMedicalClient();
    const expectResult = mockedClient;

    it('should remove management and area from the client', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.removeManagementAndArea(dni);

      // Assert
      expect(result).toEqual(expectResult);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni }, {
        areaId: null,
        areaName: null,
        managementId: null,
        managementName: null
      });
    });
  });
});