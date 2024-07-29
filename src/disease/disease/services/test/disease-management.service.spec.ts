import { TestBed } from "@automock/jest";
import { DiseaseRepository } from "../../repositories/disease.repository";
import { DiseaseManagementService } from "../disease-management.service";
import { DiseaseGroupManagementService } from "@/disease/disease-group/services/disease-group-management.service";
import { mockDiseaseGroup } from "@/disease/disease-group/services/test/stub/disease-group.stub";
import { mockDisease, mockDiseases } from "./stub/disease.stub";
import { PostDiseaseRequestDto } from "../../dtos/request/post.disease.request.dto";
import { PatchDiseaseRequestDto } from "../../dtos/request/patch.disease.request.dto";

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
    const mockedGroup = mockDiseaseGroup();
    const mockedDisease = mockDisease();
    const mockDto: PostDiseaseRequestDto = {
      name: "my-mocked-name",
      group: 1
    }

    it('should create a disease', async () => {
      groupService.findOneById.mockResolvedValueOnce(mockedGroup);
      repository.create.mockResolvedValueOnce(mockedDisease);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedDisease);
      expect(groupService.findOneById).toHaveBeenCalledWith(mockDto.group);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, group: mockedGroup });
    });

  });

  describe('find', () => {
    const mockedDiseases = mockDiseases();

    it('should return an array of diseases', async () => {
      repository.find.mockResolvedValueOnce(mockedDiseases);

      const result = await service.find();

      expect(result).toEqual(mockedDiseases);
    });
  });

  describe('updateOne', () => {
    const mockedDisease = mockDisease();
    const mockedGroup = mockDiseaseGroup();

    const id: number = 1;
    const mockDto: PatchDiseaseRequestDto = {
      name: 'my-updated-name'
    }

    it('should update an existing disease and return it', async () => {
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedDisease);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedDisease);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
    });

    it('should update an existing disease with other group and return it', async () => {
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedDisease);
      groupService.findOneById.mockResolvedValueOnce(mockedGroup);

      const result = await service.updateOne(id, { ...mockDto, group: 1 });

      expect(result).toEqual(mockedDisease);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, group: mockedGroup });
    });

  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete one disease', async () => {
      await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

});