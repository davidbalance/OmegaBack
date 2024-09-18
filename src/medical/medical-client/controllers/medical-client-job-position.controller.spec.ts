import { TestBed } from "@automock/jest";
import { MedicalClientJobPositionService } from "../services/medical-client-job-position.service";
import { MedicalClientJobPositionController } from "./medical-client-job-position.controller";
import { mockMedicalClientJobPosition } from "../stub/medical-client-job-position.stub";
import { PatchMedicalClientJobPositionRequestDto } from "../dtos/request/medical-client-job-position.patch.dto";

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
    it('should find a job position by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const mockedJobPosition = mockMedicalClientJobPosition();
      service.findOnePosition.mockResolvedValue(mockedJobPosition);

      // Act
      const result = await controller.findJobPosition(dni);

      // Assert
      expect(service.findOnePosition).toHaveBeenCalledWith(dni);
      expect(result).toEqual(mockedJobPosition);
    });
  });

  describe('assignJobPosition', () => {
    it('should assign a job position', async () => {
      // Arrange
      const dni = '1234567890';
      const mockDto: PatchMedicalClientJobPositionRequestDto = {
        jobPositionName: 'Doctor',
      };
      service.assignJobPosition.mockResolvedValue(undefined);

      // Act
      const result = await controller.assignJobPosition(dni, mockDto);

      // Assert
      expect(service.assignJobPosition).toHaveBeenCalledWith(dni, mockDto);
      expect(result).toEqual({});
    });
  });
});