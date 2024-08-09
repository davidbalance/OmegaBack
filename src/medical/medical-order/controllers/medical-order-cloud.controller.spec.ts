import { TestBed } from "@automock/jest";
import { MedicalOrderCloudService } from "../services/medical-order-cloud.service";
import { MedicalOrderCloudController } from "./medical-order-cloud.controller";
import { mockMedicalOrder } from "../services/test/stub/medical-order.stub";
import { mockMedicalOrderCloud } from "../services/test/stub/medical-order-cloud.stub";
import { GetMedicalOrderCloudResponseDto } from "../dtos/response/get.medical-order-cloud.response.dto";

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
    const id: number = 1;
    const mockedOrderCloud = mockMedicalOrderCloud();
    const expectResult: GetMedicalOrderCloudResponseDto = mockedOrderCloud;

    it('should return the medical order cloud data for the given id', async () => {
      // Arrange
      service.findOne.mockResolvedValueOnce(mockedOrderCloud);

      // Act
      const result = await controller.findFilesById(id);

      // Assert
      expect(result).toEqual(expectResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

});