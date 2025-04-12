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

    it('should return an array of options based on medical exams', async () => {
      repository.query.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValueOnce(mockedExams),
      } as any);

      const result = await service.find();

      expect(result).toEqual(mockedExams);
      expect(repository.query).toHaveBeenCalledWith('exam');
    });

  });

});