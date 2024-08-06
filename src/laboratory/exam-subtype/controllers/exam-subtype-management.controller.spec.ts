import { TestBed } from "@automock/jest";
import { ExamSubtypeManagementService } from "../services/exam-subtype-management.service";
import { ExamSubtypeManagementController } from "./exam-subtype-management.controller";
import { PostExamSubtypeRequestDto } from "../dtos/request/post.exam-subtype.dto";
import { mockExamsSubtype, mockExamsSubtypes } from "../services/test/stub/exam-subtype.stub";
import { PostExamSubtypeResponseDto } from "../dtos/response/post.exam-subtype.response.dto";
import { GetExamSubtypeArrayResponseDto } from "../dtos/response/get.exam-subtype-array.response.dto";
import { GetExamSubtypeResponseDto } from "../dtos/response/get.exam-subtype.response.dto";
import { PatchExamSubtypeRequestDto } from "../dtos/request/patch.exam-subtype.dto";
import { PatchExamSubtypeResponseDto } from "../dtos/response/patch.exam-subtype.response.dto";

describe('ExamSubtypeManagementController', () => {
  let controller: ExamSubtypeManagementController;
  let service: jest.Mocked<ExamSubtypeManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSubtypeManagementController).compile();

    controller = unit;
    service = unitRef.get(ExamSubtypeManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostExamSubtypeRequestDto = {
      name: 'New Exam Subtype',
      type: 1
    };
    const mockExamSubtypeData = mockExamsSubtype();
    const mockResponse: PostExamSubtypeResponseDto = mockExamSubtypeData;

    it('should call the service to create a new exam subtype', async () => {
      // Arrange
      service.create.mockResolvedValue(mockExamSubtypeData);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    const mockData = mockExamsSubtypes();
    const mockResponse: GetExamSubtypeArrayResponseDto = {
      data: mockData
    };

    it('should call the service to find all exam subtypes', async () => {
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
    const mockExamSubtypeData = mockExamsSubtype();
    const mockResponse: GetExamSubtypeResponseDto = mockExamSubtypeData;

    it('should call the service to find an exam subtype by ID', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockExamSubtypeData);

      // Act
      const result = await controller.findOne(id.toString());

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchExamSubtypeRequestDto = {
      name: 'Updated Exam Subtype',
      type: 2
    };
    const mockExamSubtypeData = mockExamsSubtype();
    const mockResponse: PatchExamSubtypeResponseDto = mockExamSubtypeData;

    it('should call the service to update an exam subtype', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockExamSubtypeData);

      // Act
      const result = await controller.updateOne(id.toString(), mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(+id, mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should call the service to delete an exam subtype', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.remove(id.toString());

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual({});
    });
  });
});