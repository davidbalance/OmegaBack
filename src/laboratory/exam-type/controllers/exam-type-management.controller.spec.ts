import { TestBed } from "@automock/jest";
import { ExamTypeManagementService } from "../services/exam-type-management.service";
import { ExamTypeManagementController } from "./exam-type-management.controller";
import { PostExamTypeRequestDto } from "../dtos/request/post.exam-type.dto";
import { mockExamType, mockExamTypes } from "../services/test/stub/exam-type.stub";
import { PostExamResponseDto } from "@/laboratory/exam/dtos/response/post.exam.response.dto";
import { GetExamTypeArrayResponseDto } from "../dtos/response/get.exam-type-array.dto";
import { GetExamTypeResponseDto } from "../dtos/response/get.exam-type.dto";
import { PatchExamTypeRequestDto } from "../dtos/request/patch.exam-type.dto";
import { PatchExamTypeResponseDto } from "../dtos/response/patch.exam-type.dto";

describe('ExamTypeManagementController', () => {
  let controller: ExamTypeManagementController;
  let service: jest.Mocked<ExamTypeManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypeManagementController).compile();

    controller = unit;
    service = unitRef.get(ExamTypeManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    const mockData = mockExamTypes();
    const mockResponse: GetExamTypeArrayResponseDto = {
      data: mockData
    };

    it('should call the service to find all exam types', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockData);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
});