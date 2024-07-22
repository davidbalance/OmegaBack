import { TestBed } from "@automock/jest";
import { ManagementRepository } from "../../repositories/management.repository";
import { ManagementService } from "../management.service";
import { mockManagement, mockManagements } from "./stub/management.stub";
import { PATCHManagementRequestDto } from "../../dtos/request/patch.management.request.dto";
import { POSTManagementRequestDto } from "../../dtos/request/post.management.request.dto";

describe('ManagementService', () => {
  let service: ManagementService;
  let repository: jest.Mocked<ManagementRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementService).compile();

    service = unit;
    repository = unitRef.get(ManagementRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedManagement = mockManagement();
    const mockDto: POSTManagementRequestDto = {
      name: "my-mocked-name"
    }

    it('should create a new management and return it', async () => {
      repository.create.mockResolvedValue(mockedManagement);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedManagement);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('find', () => {
    const mockedManagements = mockManagements();

    it('should return an array of managements', async () => {
      repository.find.mockResolvedValue(mockedManagements);

      const result = await service.find();

      expect(result).toEqual(mockedManagements);
    });
  });

  describe('findOneById', () => {
    const id: number = 1;
    const mockedManagement = mockManagement();

    it('should return an existing management', async () => {
      repository.findOne.mockResolvedValue(mockedManagement);

      const result = await service.findOneById(id);

      expect(result).toEqual(mockedManagement);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedManagement = mockManagement();
    const mockDto: PATCHManagementRequestDto = {
      name: "mocked-name"
    }

    it('should update an existing management', async () => {
      repository.findOneAndUpdate.mockResolvedValue(mockedManagement);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedManagement);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing management', async () => {

      const result = await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});