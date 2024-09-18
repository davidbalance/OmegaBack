import { TestBed } from "@automock/jest";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultPaginationService } from "./medical-result-pagination.service";
import { mockMedicalResultEntities } from "../stub/medical-result-entity.stub";

describe('MedicalResultPaginationService', () => {
  let service: MedicalResultPaginationService;
  let repository: jest.Mocked<MedicalResultRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultPaginationService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedMedicalResult = mockMedicalResultEntities();
    const expectedData = mockedMedicalResult;

    beforeEach(() => {
      repository.query.mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedMedicalResult)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('result');
      expect(repository.query().innerJoin).toHaveBeenCalledWith('result.order', 'order', 'order.id = :order', { order: extras });
      expect(repository.query().leftJoin).toHaveBeenCalledWith('result.report', 'report');
      expect(repository.query().leftJoin).toHaveBeenCalledWith('result.diseases', 'disease');
      expect(repository.query().select).toHaveBeenCalledWith('result.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'result.examType', 'examType');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'result.examSubtype', 'examSubtype');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'result.examName', 'examName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'result.hasFile', 'hasFile');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'disease.diseaseName', 'diseaseName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'disease.diseaseCommentary', 'diseaseCommentary');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(7, 'report.id', 'reportId');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(8, 'report.hasFile', 'reportHasFile');
      expect(repository.query().where).toHaveBeenCalledWith('result.examName LIKE :examName', { examName: `%${search}%` });
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
