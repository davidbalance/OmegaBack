import { DiseaseGroupManagementService } from "@/disease/disease-group/services/disease-group-management.service";
import { DiseaseRepository } from "../repositories/disease.repository";
import { DiseaseManagementService } from "./disease-management.service";
import { TestBed } from "@automock/jest";
import { mockDiseaseEntity } from "../stub/disease-entity.stub";
import { mockDiseaseGroup } from "@/disease/disease-group/stub/disease-group.stub";
import { DiseaseRequestDto } from "../dtos/request/disease.base.dto";
import { PatchDiseaseRequestDto } from "../dtos/request/disease.patch.dto";

describe('DiseaseManagementService', () => {
  let service: DiseaseManagementService;
  let repository: jest.Mocked<DiseaseRepository>;
  let groupService: jest.Mocked<DiseaseGroupManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseManagementService).compile();
    service = unit;
    repository = unitRef.get(DiseaseRepository);
    groupService = unitRef.get(DiseaseGroupManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: DiseaseRequestDto = {
      name: 'New Disease',
      group: 1
    };
    const mockedDiseaseData = mockDiseaseEntity();
    const mockedGroup = mockDiseaseGroup();
    const expectedData = { ...mockedDiseaseData, group: mockDto.group };

    it('should create a new disease', async () => {
      // Arrange
      groupService.findOne.mockResolvedValue(mockedGroup);
      repository.create.mockResolvedValue(mockedDiseaseData);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(groupService.findOne).toHaveBeenCalledWith(mockDto.group);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, group: { id: mockedGroup.id } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedDiseaseData = mockDiseaseEntity();
    const expectedData = { ...mockedDiseaseData, group: mockedDiseaseData.group.id };

    it('should find a disease by ID', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedDiseaseData);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id, status: true },
        select: {
          id: true,
          name: true,
          group: { id: true, name: true }
        },
        relations: { group: true }
      });
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockDto: DiseaseRequestDto = {
      name: 'Updated Disease',
      group: 2
    };
    const mockedDiseaseData = mockDiseaseEntity();
    const mockedGroup = mockDiseaseGroup();
    const expectedData = { ...mockedDiseaseData, group: mockedDiseaseData.group.id };

    it('should update a disease with a new group', async () => {
      // Arrange
      groupService.findOne.mockResolvedValue(mockedGroup);
      repository.findOneAndUpdate.mockResolvedValue(mockedDiseaseData);
      repository.findOne.mockResolvedValue(mockedDiseaseData);

      // Act
      const result = await service.updateOne(id, mockDto);

      // Assert
      expect(groupService.findOne).toHaveBeenCalledWith(mockDto.group);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDto, group: mockedGroup });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { group: true } });
      expect(result).toEqual(expectedData);
    });

    it('should update a disease without changing the group', async () => {
      // Arrange
      const { group, ...data } = mockDto;
      const mockDtoWithoutGroup: PatchDiseaseRequestDto = data;
      repository.findOneAndUpdate.mockResolvedValue(mockedDiseaseData);
      repository.findOne.mockResolvedValue(mockedDiseaseData);

      // Act
      const result = await service.updateOne(id, mockDtoWithoutGroup);

      // Assert
      expect(groupService.findOne).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDtoWithoutGroup, group: undefined });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { group: true } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should delete a disease', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});