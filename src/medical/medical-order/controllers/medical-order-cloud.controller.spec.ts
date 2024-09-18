import { TestBed } from "@automock/jest";
import { MedicalOrderCloudService } from "../services/medical-order-cloud.service";
import { MedicalOrderCloudController } from "./medical-order-cloud.controller";
import { mockMedicalOrderCloud } from "../stubs/medical-order-cloud.stub";

describe('MedicalOrderCloudController', () => {
  let controller: MedicalOrderCloudController;
  let service: jest.Mocked<MedicalOrderCloudService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderCloudController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderCloudService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findFilesById', () => {
    it('should return cloud data for a medical order', async () => {
      // Arrange
      const id = 1;
      const mockedCloudData = mockMedicalOrderCloud();
      service.findOne.mockResolvedValue(mockedCloudData);

      // Act
      const result = await controller.findFilesById(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockedCloudData);
    });
  });
});