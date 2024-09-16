import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../repositories/exam-type.repository";
import { ExamTypePaginationService } from "./exam-type-pagination.service";
import { mockExamTypeEntities } from "../stub/exam-type-entity.stub";

describe('ExamTypePaginationService', () => {
  let service: ExamTypePaginationService;
  let repository: jest.Mocked<ExamTypeRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypePaginationService).compile();

    service = unit;
    repository = unitRef.get(ExamTypeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedDiseaseData = mockExamTypeEntities();
    const expectedData = mockedDiseaseData;

    beforeEach(() => {
      repository.query.mockReturnValue({
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
      expect(repository.query).toHaveBeenCalledWith('type');
      expect(repository.query().select).toHaveBeenCalledWith('type.id', 'id');
      expect(repository.query().addSelect).toHaveBeenCalledWith('type.name', 'name');
      expect(repository.query().where).toHaveBeenCalledWith('type.name LIKE :name', { name: `%${search}%` });
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