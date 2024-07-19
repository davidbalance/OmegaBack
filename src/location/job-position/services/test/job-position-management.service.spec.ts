import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../../repositories/job-position.repository";
import { POSTJobPositionRequestDto } from "../../dtos/post.job-position.dto";
import { mockJobPosition, mockJobPositions } from "./stub/job-position.stub";
import { PATCHJobPositionRequestDto } from "../../dtos/patch.job-position.dto";
import { JobPositionManagementService } from "../job-position-management.service";

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
    const mockDto: POSTJobPositionRequestDto = {
      name: "my-mocked-name"
    }

    it('should create a new job position and return it', async () => {
      repository.create.mockResolvedValue(mockedJobPosition);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedJobPosition);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findAll', () => {
    const mockedJobPositions = mockJobPositions();

    it('should return an array of job positions', async () => {
      repository.find.mockResolvedValue(mockedJobPositions);

      const result = await service.findAll();

      expect(result).toEqual(mockedJobPositions);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();

    it('should return an existing job position', async () => {
      repository.findOne.mockResolvedValue(mockedJobPosition);

      const result = await service.findOne(id);

      expect(result).toEqual(mockedJobPosition);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedJobPosition = mockJobPosition();
    const mockDto: PATCHJobPositionRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing job position', async () => {
      repository.findOneAndUpdate.mockResolvedValue(mockedJobPosition);

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