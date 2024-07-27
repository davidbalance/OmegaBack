import { ExamTypeManagementService } from "@/laboratory/exam-type/services/exam-type-management.service";
import { ExamSubtypeRepository } from "../../repositories/exam-subtype.repository";
import { ExamSubtypeManagementService } from "../exam-subtype-management.service";
import { TestBed } from "@automock/jest";
import { mockExamsSubtype, mockExamsSubtypes } from "./stub/exam-subtype.stub";
import { PostExamSubtypeRequestDto } from "../../dto/request/post.exam-subtype.dto";
import { PatchExamSubtypeRequestDto } from "../../dto/request/patch.exam-subtype.dto";
import { mockExamType } from "@/laboratory/exam-type/services/test/stub/exam-type.stub";

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

  describe('create', () => {
    const mockedExamType = mockExamType();
    const mockedExamSubtype = mockExamsSubtype();
    const mockDto: PostExamSubtypeRequestDto = {
      name: "my-mocked-name",
      type: 1
    }

    it('should create a new exam subtype and return it', async () => {
      typeService.findOne.mockResolvedValueOnce(mockedExamType);
      repository.create.mockResolvedValueOnce(mockedExamSubtype);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedExamSubtype);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, type: mockedExamType });
    });
  });

  describe('findAll', () => {
    const mockedExamSubtypes = mockExamsSubtypes();

    it('should return an array of exam subtypes', async () => {
      repository.find.mockResolvedValueOnce(mockedExamSubtypes);

      const result = await service.findAll();

      expect(result).toEqual(mockedExamSubtypes);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedExamSubtype = mockExamsSubtype();

    it('should return an existing exam subtype', async () => {
      repository.findOne.mockResolvedValueOnce(mockedExamSubtype);

      const result = await service.findOne(id);

      expect(result).toEqual(mockedExamSubtype);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedExamSubtype = mockExamsSubtype();
    const mockedExamType = mockExamType();
    const mockDto: PatchExamSubtypeRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing exam subtype without changing the type', async () => {
      repository.findOne.mockResolvedValueOnce({ ...mockedExamSubtype, type: mockedExamType });
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamSubtype);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedExamSubtype);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
      expect(typeService.findOne).toHaveBeenCalledTimes(0);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });

    it('should update an existing exam subtype with changing the type', async () => {
      repository.findOne.mockResolvedValueOnce({ ...mockedExamSubtype, type: mockedExamType });
      typeService.findOne.mockResolvedValueOnce(mockedExamType);
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamSubtype);

      const result = await service.updateOne(id, { ...mockDto, type: 0 });

      expect(result).toEqual(mockedExamSubtype);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
      expect(typeService.findOne).toHaveBeenCalledWith(0);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, type: mockedExamType });
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing exam subtype', async () => {

      await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});