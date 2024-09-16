import { TestBed } from "@automock/jest";
import { ExamSubtypeRepository } from "../repositories/exam-subtype.repository";
import { ExamSubtypePaginationService } from "./exam-subtype-pagination.service";
import { mockExamSubtypeEntities } from "../stub/exam-subtype-entity.stub";

describe('ExamSubtypePaginationService', () => {
  let service: ExamSubtypePaginationService;
  let repository: jest.Mocked<ExamSubtypeRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSubtypePaginationService).compile();

    service = unit;
    repository = unitRef.get(ExamSubtypeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedDiseaseData = mockExamSubtypeEntities();
    const expectedData = mockedDiseaseData;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
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
      expect(repository.query).toHaveBeenCalledWith('subtype');
      expect(repository.query().innerJoinAndSelect).toHaveBeenCalledWith('subtype.type', 'type', 'type.id = :type', { type: extras });
      expect(repository.query().select).toHaveBeenCalledWith('subtype.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'subtype.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'type.id', 'type');
      expect(repository.query().where).toHaveBeenCalledWith('subtype.name LIKE :name', { name: `%${search}%` });
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