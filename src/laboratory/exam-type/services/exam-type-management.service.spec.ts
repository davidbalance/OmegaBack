import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../repositories/exam-type.repository";
import { ExamTypeManagementService } from "./exam-type-management.service";
import { mockExamType, mockExamTypes } from "../stub/exam-type.stub";
import { PostExamTypeRequestDto } from "../dtos/request/exam-type.post.dto";
import { PatchExamTypeRequestDto } from "../dtos/request/exam-type.patch.dto";

describe('ExamTypeManagementService', () => {
  let service: ExamTypeManagementService;
  let repository: jest.Mocked<ExamTypeRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypeManagementService).compile();

    service = unit;
    repository = unitRef.get(ExamTypeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedExamType = mockExamType();
    const mockDto: PostExamTypeRequestDto = {
      name: "my-mocked-name"
    }

    it('should create a new exam type and return it', async () => {
      // Arrange
      repository.create.mockResolvedValueOnce(mockedExamType);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(result).toEqual(mockedExamType);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findAll', () => {
    const mockedExamTypes = mockExamTypes();

    it('should return an array of exam types', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedExamTypes);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockedExamTypes);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedExamType = mockExamType();

    it('should return an existing exam type', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedExamType);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedExamType);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedExamType = mockExamType();
    const mockDto: PatchExamTypeRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing exam type', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamType);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(result).toEqual(mockedExamType);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing exam type', async () => {
      // Arrange
      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});