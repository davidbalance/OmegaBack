import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../../repositories/job-position.repository";
import { mockJobPosition, mockJobPositions } from "./stub/job-position.stub";
import { JobPositionManagementService } from "../job-position-management.service";
import { PostJobPositionRequestDto } from "../../dtos/request/post.job-position.request.dto";
import { PatchJobPositionRequestDto } from "../../dtos/request/patch.job-position.request.dto";

describe('JobPositionManagementService', () => {
  let service: JobPositionManagementService;
  let repository: jest.Mocked<JobPositionRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(JobPositionManagementService).compile();

    service = unit;
    repository = unitRef.get(JobPositionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedJobPosition = mockJobPosition();
    const mockDto: PostJobPositionRequestDto = {
      name: "my-mocked-name"
    }

    it('should create a new job position and return it', async () => {
      repository.create.mockResolvedValueOnce(mockedJobPosition);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedJobPosition);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findAll', () => {
    const mockedJobPositions = mockJobPositions();

    it('should return an array of job positions', async () => {
      repository.find.mockResolvedValueOnce(mockedJobPositions);

      const result = await service.findAll();

      expect(result).toEqual(mockedJobPositions);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();

    it('should return an existing job position', async () => {
      repository.findOne.mockResolvedValueOnce(mockedJobPosition);

      const result = await service.findOne(id);

      expect(result).toEqual(mockedJobPosition);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();
    const mockDto: PatchJobPositionRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing job position', async () => {
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedJobPosition);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing job position', async () => {

      const result = await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});