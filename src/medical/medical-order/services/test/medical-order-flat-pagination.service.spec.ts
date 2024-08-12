import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../../repositories/medical-order.repository";
import { MedicalOrderFlatPaginationService } from "../medical-order-flat-pagination.service";
import { MedicalOrderFlatService } from "../medical-order-flat.service";
import { mockMedicalOrders } from "./stub/medical-order.stub";
import { mockMedicalOrderFlat, mockMedicalOrderFlatArray } from "./stub/medical-order-result.-flat.stub";
import { Brackets } from "typeorm";
import { MedicalOrderFlatResponseDto } from "../../dtos/response/base.medical-order-flat.response.dto";

describe('MedicalOrderFlatPaginationService', () => {
  let service: MedicalOrderFlatPaginationService;
  let repository: jest.Mocked<MedicalOrderRepository>;
  let flatService: jest.Mocked<MedicalOrderFlatService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderFlatPaginationService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
    flatService = unitRef.get(MedicalOrderFlatService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findPaginatedDataAndPageCount', () => {
    it('should return paginated data and page count', async () => {
      const page = 1;
      const limit = 10;
      const filter = 'testFilter';
      const order = undefined;
      const mockPages = 2;
      const mockData: MedicalOrderFlatResponseDto[] = mockMedicalOrderFlatArray();

      jest.spyOn(service, 'findPageCount').mockResolvedValue(mockPages);
      jest.spyOn(service, 'findPaginatedByFilter').mockResolvedValue(mockData);

      const result = await service.findPaginatedDataAndPageCount(page, limit, filter, order);

      expect(service.findPageCount).toHaveBeenCalledWith(limit, filter);
      expect(service.findPaginatedByFilter).toHaveBeenCalledWith(page, limit, filter, order);
      expect(result).toEqual([mockPages, mockData]);
    });
  });

  describe('findPaginatedByFilter', () => {

    const page = 1;
    const limit = 10;
    const filter = 'testFilter';
    const order = undefined;
    const mockOrders = mockMedicalOrders();
    const mockFlatten = mockMedicalOrderFlat();

    const expectedResult = mockOrders.map(() => mockFlatten);

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockOrders),
      } as any);
    });

    it('should return flattened paginated data', async () => {
      // Arrange
      flatService.flat = jest.fn().mockReturnValue(mockFlatten);

      // Act
      const result = await service.findPaginatedByFilter(page, limit, filter, order);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(repository.query).toHaveBeenCalledWith('order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.client', 'client');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('client.email', 'email');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.results', 'result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('result.diseases', 'diseases');
      expect(repository.query().orderBy).toHaveBeenCalledWith('order.createAt');
      expect(repository.query().take).toHaveBeenCalledWith(limit);
      expect(repository.query().skip).toHaveBeenCalledWith(page);
      expect(repository.query().where).toHaveBeenCalled();
      expect(repository.query().orWhere).toHaveBeenCalled();
      expect(repository.query().getMany).toHaveBeenCalled();
      expect(flatService.flat).toHaveBeenCalledTimes(mockOrders.length);
    });
  });

  describe('findPageCount', () => {
    const limit = 10;
    const filter = 'testFilter';
    const mockCount = 45;
    const expectedResult = Math.floor(mockCount / limit);

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(mockCount),
      } as any);
    });

    it('should return the correct page count', async () => {
      // Arrange
      // Act
      const result = await service.findPageCount(limit, filter);
      // Assert
      expect(result).toBe(expectedResult);
      expect(repository.query).toHaveBeenCalledWith('order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.client', 'client');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('client.email', 'email');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.results', 'result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('result.diseases', 'diseases');
      expect(repository.query().where).toHaveBeenCalled();
      expect(repository.query().orWhere).toHaveBeenCalled();
      expect(repository.query().getCount).toHaveBeenCalled();
    });
  });
});