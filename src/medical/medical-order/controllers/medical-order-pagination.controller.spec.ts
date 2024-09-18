import { TestBed } from "@automock/jest";
import { MedicalOrderPaginationService } from "../services/medical-order-pagination.service";
import { MedicalOrderPaginationController } from "./medical-order-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockMedicalOrder, mockMedicalOrders } from "../stubs/medical-order.stub";

describe('MedicalOrderPaginationController', () => {
  let controller: MedicalOrderPaginationController;
  let service: jest.Mocked<MedicalOrderPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const dni: string = "1234567890";
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockMedicalOrders();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(dni, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, dni);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const dni: string = "1234567890";
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(dni, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, dni);
      expect(result).toEqual(expectedData);
    });
  });
});