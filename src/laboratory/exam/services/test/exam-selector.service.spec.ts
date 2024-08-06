import { TestBed } from "@automock/jest";
import { ExamRepository } from "../../repositories/exam.repository";
import { ExamSelectorService } from "../exam-selector.service";
import { mockExamOptions } from "./stub/exam-selector.stub";

describe('ExamSelectorService', () => {
  let service: ExamSelectorService;
  let repository: jest.Mocked<ExamRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSelectorService).compile();

    service = unit;
    repository = unitRef.get(ExamRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedExams = mockExamOptions();

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValueOnce(mockedExams),
      } as any);
    });

    it('should return an array of options based on exams', async () => {
      // Arrange
      // Act
      const result = await service.find();

      // Assert
      expect(result).toEqual(mockedExams);
      expect(repository.query).toHaveBeenCalledWith('exam');
      expect(repository.query().select).toHaveBeenCalledWith('exam.id', 'key');
      expect(repository.query().addSelect).toHaveBeenCalledWith('exam.name', 'label');
      expect(repository.query().getRawMany).toHaveBeenCalled();
    });

  });

});