import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../repositories/exam-type.repository";
import { ExamTypeOptionService } from "./exam-type-option.service";
import { mockExamTypeEntities } from "../stub/exam-type-entity.stub";

describe('ExamTypeOptionService', () => {
  let service: ExamTypeOptionService;
  let repository: jest.Mocked<ExamTypeRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypeOptionService).compile();

    service = unit;
    repository = unitRef.get(ExamTypeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of ExtendedExamType', async () => {
      // Arrange
      const mockedData = mockExamTypeEntities();
      repository.find.mockResolvedValue(mockedData);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { status: true } });
      expect(result).toEqual(mockedData);
    });
  });
});