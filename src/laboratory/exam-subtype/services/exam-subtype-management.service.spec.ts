import { ExamTypeManagementService } from "@/laboratory/exam-type/services/exam-type-management.service";
import { ExamSubtypeRepository } from "../repositories/exam-subtype.repository";
import { ExamSubtypeManagementService } from "./exam-subtype-management.service";
import { TestBed } from "@automock/jest";
import { ExamSubtypeRequestDto } from "../dtos/request/exam-subtype.base.dto";
import { mockExamSubtypeEntity } from "../stub/exam-subtype-entity.stub";
import { mockExamType } from "@/laboratory/exam-type/stub/exam-type.stub";

describe('ExamSubtypeManagementService', () => {
  let service: ExamSubtypeManagementService;
  let repository: jest.Mocked<ExamSubtypeRepository>;
  let typeService: jest.Mocked<ExamTypeManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamSubtypeManagementService).compile();

    service = unit;
    repository = unitRef.get(ExamSubtypeRepository);
    typeService = unitRef.get(ExamTypeManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an exam subtype', async () => {
      // Arrange
      const mockDto: ExamSubtypeRequestDto = {
        name: 'New Exam Subtype',
        type: 1,
      };
      const mockedExamSubtypeData = mockExamSubtypeEntity();
      const mockedType = mockExamType();
      const expectedData = { ...mockedExamSubtypeData, type: mockDto.type };
      typeService.findOne.mockResolvedValue(mockedType);
      repository.create.mockResolvedValue(mockedExamSubtypeData);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(typeService.findOne).toHaveBeenCalledWith(mockDto.type);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, type: mockedType });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    it('should find an exam subtype by ID', async () => {
      // Arrange
      const id = 1;
      const mockedExamSubtypeData = mockExamSubtypeEntity();
      const expectedData = { ...mockedExamSubtypeData, type: mockedExamSubtypeData.type.id };
      repository.findOne.mockResolvedValue(mockedExamSubtypeData);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { type: true } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('hasExams', () => {
    const id = 1;
    const mockedExamSubtypeData = mockExamSubtypeEntity();

    it('should return true if the exam subtype has exams', async () => {
      // Arrange
      repository.findOne.mockResolvedValue({ ...mockedExamSubtypeData, exams: [{ id: 1 } as any] });

      // Act
      const result = await service.hasExams(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { exams: true } });
      expect(result).toBe(true);
    });

    it('should return false if the exam subtype has no exams', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedExamSubtypeData);

      // Act
      const result = await service.hasExams(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { exams: true } });
      expect(result).toBe(false);
    });
  });

  describe('updateOne', () => {

    const id = 1;
    const mockDto: ExamSubtypeRequestDto = {
      name: 'Updated Exam Subtype',
      type: 1,
    };
    const mockedExamSubtypeData = mockExamSubtypeEntity();
    const mockedType = mockExamType();
    const expectedData = { ...mockedExamSubtypeData, type: mockDto.type };

    it('should update an exam subtype with a new type', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedExamSubtypeData);
      typeService.findOne.mockResolvedValue(mockedType);
      repository.findOneAndUpdate.mockResolvedValue(mockedExamSubtypeData);
      const newMockDto = { ...mockDto, type: 2 };
      // Act
      const result = await service.updateOne(id, newMockDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
      expect(typeService.findOne).toHaveBeenCalledWith(newMockDto.type);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...newMockDto, type: mockedType });
      expect(result).toEqual(expectedData);
    });

    it('should update an exam subtype without changing the type', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedExamSubtypeData);
      repository.findOneAndUpdate.mockResolvedValue(mockedExamSubtypeData);

      // Act
      const { type, ...mockDtoWithoutType } = mockDto;
      const result = await service.updateOne(id, mockDtoWithoutType);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
      expect(typeService.findOne).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDto, type: undefined });
      expect(result).toEqual(expectedData);
    });
  });

  describe('deleteOne', () => {
    it('should delete an exam subtype', async () => {
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
