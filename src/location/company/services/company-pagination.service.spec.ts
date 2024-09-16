import { TestBed } from "@automock/jest";
import { CompanyRepository } from "../repositories/company.repository";
import { CompanyPaginationService } from "./company-pagination.service";
import { mockCompanyEntities } from "../stub/company-entity.stub";

describe('CompanyPaginationService', () => {
  let service: CompanyPaginationService;
  let repository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CompanyPaginationService).compile();

    service = unit;
    repository = unitRef.get(CompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedCompany = mockCompanyEntities();
    const expectedData = mockedCompany;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedCompany)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('company');
      expect(repository.query().innerJoin).toHaveBeenCalledWith('company.corporativeGroup', 'corporativeGroup', 'corporativeGroup.id = :corporativeGroup', { corporativeGroup: extras });
      expect(repository.query().select).toHaveBeenCalledWith('company.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'company.ruc', 'ruc');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'company.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'company.address', 'address');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'company.phone', 'phone');
      expect(repository.query().where).toHaveBeenCalledWith('company.name LIKE :name', { name: `%${search}%` });
      expect(repository.query().orWhere).toHaveBeenCalledWith('company.ruc LIKE :ruc', { ruc: `%${search}%` });
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
