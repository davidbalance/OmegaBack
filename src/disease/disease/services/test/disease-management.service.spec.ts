import { TestBed } from "@automock/jest";
import { DiseaseRepository } from "../../repositories/disease.repository";
import { DiseaseManagementService } from "../disease-management.service";
import { DiseaseGroupManagementService } from "@/disease/disease-group/services/disease-group-management.service";
import { mockDiseaseGroup } from "@/disease/disease-group/services/test/stub/disease-group.stub";
import { mockDisease, mockDiseases } from "./stub/disease.stub";
import { PostDiseaseRequestDto } from "../../dtos/request/disease.post.dto";
import { PatchDiseaseRequestDto } from "../../dtos/request/disease.patch.dto";

describe('DiseaseManagementService', () => {
  let service: DiseaseManagementService;

  beforeEach(async () => {
    const { unit } = TestBed.create(DiseaseManagementService).compile();
    service = unit;
  });

  it('', () => {
    expect(service).toBeDefined();
  });
  /*   let repository: jest.Mocked<DiseaseRepository>;
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
      const mockedDiseaseGroup = mockDiseaseGroup();
      const mockedDisease = mockDisease();
      const mockDto: PostDiseaseRequestDto = {
        name: "my-mocked-name",
        group: 1
      }
  
      it('should create a new disease', async () => {
        // Arrange
        groupService.findOneById.mockResolvedValue(mockedDiseaseGroup);
        repository.create.mockResolvedValue(mockedDisease);
  
        // Act
        const result = await service.create(mockDto);
  
        // Assert
        expect(groupService.findOneById).toHaveBeenCalledWith(mockDto.group);
        expect(repository.create).toHaveBeenCalledWith({ ...mockDto, group: mockedDiseaseGroup });
        expect(result).toEqual(mockedDisease);
      });
    });
  
    describe('find', () => {
      const mockedDiseases = mockDiseases();
  
      it('should find all diseases', async () => {
        // Arrange
        repository.find.mockResolvedValue(mockedDiseases);
  
        // Act
        const result = await service.find();
  
        // Assert
        expect(repository.find).toHaveBeenCalledWith({
          where: { status: true },
          select: {
            id: true,
            name: true,
            group: { id: true, name: true }
          },
          relations: { group: true }
        });
        expect(result).toEqual(mockedDiseases);
      });
  
    });
  
    describe('updateOne', () => {
      const mockedDisease = mockDisease();
      const mockedDiseaseGroup = mockDiseaseGroup();
  
      const id: number = 1;
      const mockDto: PatchDiseaseRequestDto = {
        name: 'my-updated-name',
        group: 1
      }
  
      beforeEach(() => {
        repository.findOneAndUpdate.mockResolvedValue(mockedDisease);
      });
  
      it('should update a disease with a new group', async () => {
        // Arrange
        groupService.findOneById.mockResolvedValue(mockedDiseaseGroup);
  
        // Act
        const result = await service.updateOne(id, mockDto);
  
        // Assert
        expect(groupService.findOneById).toHaveBeenCalledWith(mockDto.group);
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...mockDto, group: mockedDiseaseGroup });
        expect(result).toEqual(mockedDisease);
      });
  
  
      it('should update a disease without changing the group', async () => {
        // Arrange
        const { group, ...data } = mockDto;
        const mockDtoWithoutGroup: PatchDiseaseRequestDto = data;
  
        // Act
        const result = await service.updateOne(id, mockDtoWithoutGroup);
  
        // Assert
        expect(groupService.findOneById).not.toHaveBeenCalled();
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDtoWithoutGroup);
        expect(result).toEqual(mockedDisease);
      });
  
    });
  
    describe('deleteOne', () => {
      const id: number = 1;
  
      it('should delete a disease', async () => {
        // Arrange
        repository.findOneAndDelete.mockResolvedValue(undefined);
  
        // Act
        await service.deleteOne(id);
  
        // Assert
        expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
      });
    }); */

});