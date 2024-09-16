import { TestBed } from "@automock/jest";
import { ExamSubtypeManagementService } from "../services/exam-subtype-management.service";
import { ExamSubtypeManagementController } from "./exam-subtype-management.controller";
import { PostExamSubtypeRequestDto } from "../dtos/request/exam-subtype.post.dto";
import { mockExamSubtype } from "../stub/exam-subtype.stub";
import { PatchExamSubtypeRequestDto } from "../dtos/request/exam-subtype.patch.dto";

describe('ExamSubtypeManagementController', () => {
  let controller: ExamSubtypeManagementController;
  let service: jest.Mocked<ExamSubtypeManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSubtypeManagementController).compile();
    controller = unit;
    service = unitRef.get(ExamSubtypeManagementService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostExamSubtypeRequestDto = {
      name: 'New Disease',
      type: 1
    };
    const mockedDisease = mockExamSubtype();

    it('should call the service to create a new exam subtype', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedDisease);

      // Act
      await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedDisease = mockExamSubtype();
    const expectedData = mockedDisease;

    it('should call the service to find one exam subtype', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedDisease);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedData);
    });
  });

  describe('hasExams', () => {
    const id = 1;
    const mockedValue = true;
    const expectedData = { hasValue: mockedValue };

    it('should call the service to update a disease', async () => {
      // Arrange
      service.hasExams.mockResolvedValue(mockedValue);

      // Act
      const result = await controller.hasExams(id);

      // Assert
      expect(service.hasExams).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: PatchExamSubtypeRequestDto = {
      name: 'Updated Disease',
    };
    const mockedDisease = mockExamSubtype();

    it('should call the service to update a exam subtype', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedDisease);

      // Act
      await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should call the service to delete a disease', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      await controller.deleteOne(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
    });
  });
});