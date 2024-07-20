import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeManagementService } from "../exam-type-management.service";
import { mockExamType, mockExamTypes } from "./stub/exam-type.stub";
import { POSTExamTypeRequestDto } from "../../dtos/post.exam-type.dto";
import { PATCHExamTypeRequestDto } from "../../dtos/patch.exam-type.dto";

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
    const mockDto: POSTExamTypeRequestDto = {
      name: "my-mocked-name"
    }

    it('should create a new exam type and return it', async () => {
      repository.create.mockResolvedValueOnce(mockedExamType);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedExamType);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findAll', () => {
    const mockedExamTypes = mockExamTypes();

    it('should return an array of exam types', async () => {
      repository.find.mockResolvedValueOnce(mockedExamTypes);

      const result = await service.findAll();

      expect(result).toEqual(mockedExamTypes);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedExamType = mockExamType();

    it('should return an existing exam type', async () => {
      repository.findOne.mockResolvedValueOnce(mockedExamType);

      const result = await service.findOne(id);

      expect(result).toEqual(mockedExamType);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedExamType = mockExamType();
    const mockDto: PATCHExamTypeRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing exam type', async () => {
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamType);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedExamType);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing exam type', async () => {

      await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});