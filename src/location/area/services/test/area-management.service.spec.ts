import { TestBed } from "@automock/jest";
import { AreaRepository } from "../../repositories/area.repository";
import { AreaManagementService } from "../area-management.service";
import { ManagementService } from "@/location/management/services/management.service";
import { mockArea, mockAreas } from "./stub/area.stub";
import { mockManagement } from "@/location/management/services/test/stub/management.stub";
import { PATCHAreaRequestDto } from "../../dtos/patch.area.dto";
import { POSTAreaRequestDto } from "../../dtos/post.area.dto";

describe('AreaManagementService', () => {
  let service: AreaManagementService;
  let repository: jest.Mocked<AreaRepository>;
  let managementService: jest.Mocked<ManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaManagementService).compile();

    service = unit;
    repository = unitRef.get(AreaRepository);
    managementService = unitRef.get(ManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedArea = mockArea();
    const mockedManagement = mockManagement();
    const mockDto: POSTAreaRequestDto = {
      name: "my-mocked-name",
      management: 1
    }

    it('should create a new management and return it', async () => {
      managementService.findOneById.mockResolvedValueOnce(mockedManagement);
      repository.create.mockResolvedValue(mockedArea);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedArea);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, management: mockedManagement });
      expect(managementService.findOneById).toHaveBeenCalledWith(mockDto.management);
    });
  });

  describe('find', () => {
    const mockedAreas = mockAreas();

    it('should return an array of managements', async () => {
      repository.find.mockResolvedValue(mockedAreas);

      const result = await service.find();

      expect(result).toEqual(mockedAreas);
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedArea = mockArea();
    const mockedManagement = mockManagement();
    const mockDto: PATCHAreaRequestDto = {
      name: "mocked-name",
      management: 1
    }

    it('should update an existing management', async () => {
      managementService.findOneById.mockResolvedValueOnce(mockedManagement);
      repository.findOneAndUpdate.mockResolvedValue(mockedArea);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedArea);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, management: mockedManagement });
      expect(managementService.findOneById).toHaveBeenCalledWith(mockDto.management);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete an existing management', async () => {

      await service.deleteOne(id);
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});