import { TestBed } from "@automock/jest";
import { MedicalOrderExpandedPaginationService } from "../services/medical-order-expanded-pagination.service";
import { MedicalOrderExpandedPaginationController } from "./medical-order-expanded-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockExpandedMedicalOrders } from "../stubs/expanded-medical-order.stub";

describe('MedicalOrderExpandedPaginationController', () => {
  let controller: MedicalOrderExpandedPaginationController;
  let service: jest.Mocked<MedicalOrderExpandedPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderExpandedPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderExpandedPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockExpandedMedicalOrders();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });
});