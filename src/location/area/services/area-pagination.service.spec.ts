import { TestBed } from "@automock/jest";
import { AreaRepository } from "../repositories/area.repository";
import { AreaPaginationService } from "./area-pagination.service";
import { mockAreaEntities } from "../stub/area-entity.stub";

describe('AreaPaginationService', () => {
  let service: AreaPaginationService;
  let repository: jest.Mocked<AreaRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaPaginationService).compile();

    service = unit;
    repository = unitRef.get(AreaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedArea = mockAreaEntities();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
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
      expect(repository.query).toHaveBeenCalledWith('area');
      expect(repository.query().innerJoinAndSelect).toHaveBeenCalledWith('area.management', 'management', 'management.id = :management', { management: extras });
      expect(repository.query().select).toHaveBeenCalledWith('area.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'area.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'management.id', 'management');
      expect(repository.query().where).toHaveBeenCalledWith('area.name LIKE :name', { name: `%${search}%` });
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
