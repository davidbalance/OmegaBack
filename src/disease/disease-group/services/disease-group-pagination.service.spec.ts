import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";
import { DiseaseGroupPaginationService } from "./disease-group-pagination.service";
import { mockDiseaseGroupEntities } from "../stub/disease-group-entity.stub";

describe('DiseaseGroupPaginationService', () => {
  let service: DiseaseGroupPaginationService;
  let repository: jest.Mocked<DiseaseGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupPaginationService).compile();

    service = unit;
    repository = unitRef.get(DiseaseGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedDiseaseData = mockDiseaseGroupEntities();
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
      expect(repository.query).toHaveBeenCalledWith('group');
      expect(repository.query().select).toHaveBeenCalledWith('group.id', 'id');
      expect(repository.query().addSelect).toHaveBeenCalledWith('group.name', 'name');
      expect(repository.query().where).toHaveBeenCalledWith('group.name LIKE :name', { name: `%${search}%` });
      expect(repository.query().andWhere).toHaveBeenCalledWith('group.status = 1');
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