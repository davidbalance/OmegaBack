import { TestBed } from "@automock/jest";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchPaginationService } from "./branch-pagination.service";
import { mockBranchEntities } from "../stub/branch-entity.stub";

describe('BranchPaginationService', () => {
  let service: BranchPaginationService;
  let repository: jest.Mocked<BranchRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BranchPaginationService).compile();

    service = unit;
    repository = unitRef.get(BranchRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedArea = mockBranchEntities();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
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
      expect(repository.query).toHaveBeenCalledWith('branch');
      expect(repository.query().innerJoin).toHaveBeenCalledWith('branch.company', 'company', 'company.id = :company', { company: extras });
      expect(repository.query().innerJoinAndSelect).toHaveBeenCalledWith('branch.city', 'city');
      expect(repository.query().select).toHaveBeenCalledWith('branch.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'branch.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'city.name', 'city');
      expect(repository.query().where).toHaveBeenCalledWith('branch.name LIKE :name', { name: `%${search}%` });
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
