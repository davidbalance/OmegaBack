import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderExpandedPaginationService } from "./medical-order-expanded-pagination.service";
import { mockMedicalOrderEntities } from "../stubs/medical-order-entity.stub";

describe('MedicalOrderExpandedPaginationService', () => {
  let service: MedicalOrderExpandedPaginationService;
  let repository: jest.Mocked<MedicalOrderRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderExpandedPaginationService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedArea = mockMedicalOrderEntities();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedArea)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('order.client', 'client');
      expect(repository.query().select).toHaveBeenCalledWith('order.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'client.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'client.lastname', 'lastname');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'client.dni', 'dni');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'order.mailStatus', 'mailStatus');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'order.orderStatus', 'orderStatus');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'order.companyRuc', 'companyRuc');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(7, 'order.companyName', 'companyName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(8, 'order.process', 'process');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(9, 'order.createAt', 'createAt');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(10, 'order.hasFile', 'hasFile');
      expect(repository.query().where).toHaveBeenCalled();
      expect(repository.query().orWhere).toHaveBeenCalled();
      expect(repository.query().limit).toHaveBeenCalledWith(take);
      expect(repository.query().offset).toHaveBeenCalledWith(page);
      expect(repository.query().getRawMany).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field', async () => {
      // Arrange
      const field: string = 'name';
      // Act
      const result = await service.find({ search, page, take, field }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, 'ASC');
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field and order', async () => {
      // Arrange
      const field: string = 'name';
      const order: any = 'desc';
      // Act
      const result = await service.find({ search, page, take, field, order }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, order.toUpperCase());
      expect(result).toEqual(expectedData);
    });
  });
});
