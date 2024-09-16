import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../repositories/exam-type.repository";
import { ExamTypeManagementService } from "./exam-type-management.service";
import { ExamTypeRequestDto } from "../dtos/request/exam-type.base.dto";
import { mockExamTypeEntity } from "../stub/exam-type-entity.stub";

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
    it('should create an exam type', async () => {
      // Arrange
      const mockDto: ExamTypeRequestDto = { name: 'Test Type' };
      const mockedData = mockExamTypeEntity();
      repository.create.mockResolvedValue(mockedData);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockedData);
    });
  });

  describe('findOne', () => {
    it('should find an exam type by ID', async () => {
      // Arrange
      const id = 1;
      const mockedData = mockExamTypeEntity();
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockedData);
    });
  });

  describe('updateOne', () => {
    it('should update an exam type', async () => {
      // Arrange
      const id = 1;
      const mockDto: ExamTypeRequestDto = { name: 'Updated Exam Type' };
      const mockedData = mockExamTypeEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedData);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDto);
      expect(result).toEqual(mockedData);
    });
  });

  describe('deleteOne', () => {
    it('should delete an exam type', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});
