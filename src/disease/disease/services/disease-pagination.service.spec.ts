import { TestBed } from "@automock/jest";
import { DiseaseRepository } from "../repositories/disease.repository";
import { DiseasePaginationService } from "./disease-pagination.service";
import { mockDiseaseEntities } from "../stub/disease-entity.stub";

describe('DiseasePaginationService', () => {
  let service: DiseasePaginationService;
  let repository: jest.Mocked<DiseaseRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseasePaginationService).compile();

    service = unit;
    repository = unitRef.get(DiseaseRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedDiseaseData = mockDiseaseEntities();
    const expectedData = mockedDiseaseData;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedDiseaseData)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('disease');
      expect(repository.query().innerJoinAndSelect).toHaveBeenCalledWith('disease.group', 'group', 'group.id = :group', { group: extras });
      expect(repository.query().select).toHaveBeenCalledWith('disease.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'disease.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'group.id', 'group');
      expect(repository.query().where).toHaveBeenCalledWith('disease.name LIKE :name', { name: `%${search}%` });
      expect(repository.query().andWhere).toHaveBeenCalledWith('disease.status = 1');
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
