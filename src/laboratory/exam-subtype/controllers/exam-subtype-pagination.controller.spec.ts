import { TestBed } from "@automock/jest";
import { ExamSubtypePaginationService } from "../services/exam-subtype-pagination.service";
import { ExamSubtypePaginationController } from "./exam-subtype-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockExamSubtypes } from "../stub/exam-subtype.stub";

describe('ExamSubtypePaginationController', () => {
  let controller: ExamSubtypePaginationController;
  let service: jest.Mocked<ExamSubtypePaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSubtypePaginationController).compile();
    controller = unit;
    service = unitRef.get(ExamSubtypePaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockExamSubtypes();
    const expectedData = { data: mockedExams };

    it('should call the service to find an exam subtype', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(subtype, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count exam subtypes', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(subtype, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });
});