import { TestBed } from "@automock/jest";
import { MedicalOrderFlatPaginationService } from "../services/medical-order-flat-pagination.service";
import { MedicalOrderPaginationController } from "./medical-order-pagination.controller";
import { mockMedicalOrders } from "../services/test/stub/medical-order.stub";
import { PostMedicalOrderFlatPaginationResponseDto } from "../dtos/response/post.medical-order-flat-pagination.response.dto";
import { mockMedicalOrderFlatArray } from "../services/test/stub/medical-order-result.stub";

describe('MedicalOrderPaginationController', () => {
  let controller: MedicalOrderPaginationController;
  let service: jest.Mocked<MedicalOrderFlatPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderPaginationController).compile();

    controller = unit;
    service = unitRef.get(MedicalOrderFlatPaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByFilterAndPagination', () => {
    const page: number = 1;
    const limit: number = 10;
    const filter: any = { patientDni: '1234567890' };
    const order: any = { orderDate: 'DESC' };
    const mockedOrders = mockMedicalOrderFlatArray();
    const mockedPages = 2;
    const expectedResult: PostMedicalOrderFlatPaginationResponseDto = {
      pages: mockedPages,
      data: mockedOrders as any
    };

    it('should return paginated medical orders based on filter and pagination parameters', async () => {
      // Arrange
      service.findPaginatedDataAndPageCount.mockResolvedValueOnce([mockedPages, mockedOrders as any]);

      // Act
      const result = await controller.findByFilterAndPagination({ page, limit, filter, order });

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findPaginatedDataAndPageCount).toHaveBeenCalledWith(page, limit, filter, order);
    });
  });
});
