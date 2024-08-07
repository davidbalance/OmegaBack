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

  describe('create', () => {
    const mockDto: PostExamTypeRequestDto = {
      name: 'New Exam Type',
    };
    const mockExamTypeData = mockExamType();
    const mockResponse: PostExamResponseDto = mockExamTypeData;

    it('should call the service to create a new exam type', async () => {
      // Arrange
      service.create.mockResolvedValue(mockExamTypeData);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });
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

  describe('findOne', () => {
    const id = 1;
    const mockExamTypeData = mockExamType();
    const mockResponse: GetExamTypeResponseDto = mockExamTypeData;

    it('should call the service to find an exam type by ID', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockExamTypeData);

      // Act
      const result = await controller.findOne(id.toString());

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchExamTypeRequestDto = {
      name: 'Updated Exam Type',
    };
    const mockExamTypeData = mockExamType();
    const mockResponse: PatchExamTypeResponseDto = mockExamTypeData;

    it('should call the service to update an exam type', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockExamTypeData);

      // Act
      const result = await controller.updateOne(id.toString(), mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(+id, mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should call the service to delete an exam type', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteOne(id.toString());

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual({});
    });
  });
});