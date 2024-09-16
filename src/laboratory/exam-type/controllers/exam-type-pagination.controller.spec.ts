import { TestBed } from "@automock/jest";
import { ExamTypePaginationService } from "../services/exam-type-pagination.service";
import { ExamTypePaginationController } from "./exam-type-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockExamTypes } from "../stub/exam-type.stub";

describe('ExamTypePaginationController', () => {
  let controller: ExamTypePaginationController;
  let service: jest.Mocked<ExamTypePaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypePaginationController).compile();
    controller = unit;
    service = unitRef.get(ExamTypePaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockExamTypes();
    const expectedData = { data: mockedExams };

    it('should call the service to find an exam type', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count exam types', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });
});