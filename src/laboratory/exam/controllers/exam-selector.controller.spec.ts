import { TestBed } from "@automock/jest";
import { ExamSelectorService } from "../services/exam-selector.service";
import { ExamSelectorController } from "./exam-selector.controller";
import { mockExamOptions } from "../services/test/stub/exam-selector.stub";
import { GetExamSelectorOptionArrayResponseDto } from "../dtos/response/get.exam-selector.response.dto";

describe('ExamSelectorController', () => {
  let controller: ExamSelectorController;
  let service: jest.Mocked<ExamSelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSelectorController).compile();

    controller = unit;
    service = unitRef.get(ExamSelectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const mockOptions = mockExamOptions();
    const mockResponse: GetExamSelectorOptionArrayResponseDto = { options: mockOptions };

    it('should call the service to find selector options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockOptions);

      // Act
      const result = await controller.findSelectorOptions();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
});