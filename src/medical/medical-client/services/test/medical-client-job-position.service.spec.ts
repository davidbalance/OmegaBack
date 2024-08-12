import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../../repositories/medical-client.repository";
import { MedicalClientJobPositionService } from "../medical-client-job-position.service";
import { mockMedicalClient } from "./stub/medical-client.stub";
import { PatchMedicalClientJobPositionRequestDto } from "../../dtos/request/patch.medical-client-job-position.request.dto";

describe('MedicalClientJobPositionService', () => {
  let service: MedicalClientJobPositionService;
  let repository: jest.Mocked<MedicalClientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientJobPositionService).compile();

    service = unit;
    repository = unitRef.get(MedicalClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOnePosition', () => {
    const dni: string = '1234567890';
    const mockedClient = mockMedicalClient();

    it('should return the client with the job position for the given dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.findOnePosition(dni);

      // Assert
      expect(result).toEqual(mockedClient);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { dni } });
    });
  });

  describe('assignJobPosition', () => {
    const dni: string = '1234567890';
    const body: PatchMedicalClientJobPositionRequestDto = {
      jobPositionName: 'Doctor'
    };
    const mockedClient = mockMedicalClient();

    it('should assign the job position to the client', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedClient);

      // Act
      const result = await service.assignJobPosition(dni, body);

      // Assert
      expect(result).toEqual(mockedClient);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni }, body);
    });
  });
});