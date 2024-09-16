import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionPaginationService } from "./job-position-pagination.service";
import { mockJobPositionEntities } from "../stub/job-position-entity.stub";

describe('JobPositionPaginationService', () => {
  let service: JobPositionPaginationService;
  let repository: jest.Mocked<JobPositionRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionPaginationService).compile();

    service = unit;
    repository = unitRef.get(JobPositionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedJobPosition = mockJobPositionEntities();
    const expectedData = mockedJobPosition;

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedJobPosition)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('jobposition');
      expect(repository.query().select).toHaveBeenCalledWith('jobposition.id', 'id');
      expect(repository.query().addSelect).toHaveBeenCalledWith('jobposition.name', 'name');
      expect(repository.query().where).toHaveBeenCalledWith('jobposition.name LIKE :name', { name: `%${search}%` });
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
