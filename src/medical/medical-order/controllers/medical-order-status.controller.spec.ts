import { TestBed } from "@automock/jest";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { MedicalOrderStatusController } from "./medical-order-status.controller";
import { mockMedicalOrder } from "../stubs/medical-order.stub";
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

  describe('findOne', () => {
    it('should find a medical order by ID', async () => {
      // Arrange
      const id = 1;
      const mockedOrder = mockMedicalOrder();
      service.findOne.mockResolvedValue(mockedOrder);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockedOrder);
    });
  });

  describe('findOneAndValidateStatus', () => {
    it('should update the status of a medical order to validated', async () => {
      // Arrange
      const id = 1;
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndValidateStatus(id);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, { orderStatus: OrderStatus.VALIDATED });
      expect(result).toEqual({});
    });
  });

  describe('findOneAndCratedStatus', () => {
    it('should update the status of a medical order to created', async () => {
      // Arrange
      const id = 1;
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndCratedStatus(id);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, { orderStatus: OrderStatus.CREATED });
      expect(result).toEqual({});
    });
  });
});