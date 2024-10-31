import { TestBed } from "@automock/jest";
import { MedicalOrderProcessController } from "./medical-order-process.controller";
import { MedicalOrderProcessService } from "../services/medical-order-process.service";

describe('MedicalOrderProcessController', () => {
  let controller: MedicalOrderProcessController;
  let service: jest.Mocked<MedicalOrderProcessService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderProcessController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderProcessService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedProcesses = ['Post-Ocupacional', 'Pre-Ocupacional', 'Ocupacional'];
    const expectedData = { data: mockedProcesses };

    it('should call the service to find all the processes', async () => {
      // Arrange
      service.retriveProcesses.mockResolvedValue(mockedProcesses);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.retriveProcesses).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });
});