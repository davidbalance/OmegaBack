import { TestBed } from "@automock/jest";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { MedicalOrderStatusController } from "./medical-order-status.controller";
import { mockMedicalOrder } from "../services/test/stub/medical-order.stub";
import { GetMedicalOrderResponseDto } from "../dtos/response/get.medical-order.response.dto";
import { OrderStatus } from "../enums";

describe('MedicalOrderStatusController', () => {
  let controller: MedicalOrderStatusController;
  let service: jest.Mocked<MedicalOrderManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderStatusController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOneAndValidateStatus', () => {
    const id: number = 1;
    const mockedOrder = mockMedicalOrder();
    const expectedResult: GetMedicalOrderResponseDto = mockedOrder as any;

    it('should update the order status to VALIDATED', async () => {
      // Arrange
      service.updateOne.mockResolvedValueOnce(mockedOrder);

      // Act
      const result = await controller.findOneAndValidateStatus(id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.updateOne).toHaveBeenCalledWith(id, { orderStatus: OrderStatus.VALIDATED });
    });
  });

  describe('findOneAndCratedStatus', () => {
    const id: number = 1;
    const mockedOrder = mockMedicalOrder();
    const expectedResult: GetMedicalOrderResponseDto = mockedOrder as any;

    it('should update the order status to CREATED', async () => {
      // Arrange
      service.updateOne.mockResolvedValueOnce(mockedOrder);

      // Act
      const result = await controller.findOneAndCratedStatus(id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.updateOne).toHaveBeenCalledWith(id, { orderStatus: OrderStatus.CREATED });
    });
  });
});