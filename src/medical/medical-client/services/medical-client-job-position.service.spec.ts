import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../repositories/medical-client.repository";
import { MedicalClientJobPositionService } from "./medical-client-job-position.service";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";
import { MedicalClientJobPositionRequestDto } from "../dtos/request/medical-client-job-position.base.dto";

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
    it('should find a medical client by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedClient = mockMedicalClientEntity();
      repository.findOne.mockResolvedValue(mockedClient);

      // Act
      const result = await service.findOnePosition(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { dni } });
      expect(result).toEqual(mockedClient);
    });
  });

  describe('assignJobPosition', () => {
    it('should assign a job position to a medical client', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: MedicalClientJobPositionRequestDto = {
        jobPositionName: 'Doctor',
      };
      const mockedClient = mockMedicalClientEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedClient);

      // Act
      const result = await service.assignJobPosition(dni, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ dni: dni }, mockDto);
      expect(result).toEqual(mockedClient);
    });
  });
});