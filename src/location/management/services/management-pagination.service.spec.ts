import { TestBed } from "@automock/jest";
import { ManagementRepository } from "../repositories/management.repository";
import { ManagementPaginationService } from "./management-pagination.service";
import { mockManagementEntities } from "../stub/management-entity.stub";

describe('ManagementPaginationService', () => {
  let service: ManagementPaginationService;
  let repository: jest.Mocked<ManagementRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementPaginationService).compile();

    service = unit;
    repository = unitRef.get(ManagementRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedArea = mockManagementEntities();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
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
      expect(repository.query).toHaveBeenCalledWith('management');
      expect(repository.query().select).toHaveBeenCalledWith('management.id', 'id');
      expect(repository.query().addSelect).toHaveBeenCalledWith('management.name', 'name');
      expect(repository.query().where).toHaveBeenCalledWith('management.name LIKE :name', { name: `%${search}%` });
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
