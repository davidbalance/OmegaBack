import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../../repository/disease-group.repository";
import { DiseaseGroupManagementService } from "../disease-group-management.service";
import { mockDiseaseGroup, mockDiseaseGroups } from "./stub/disease-group.stub";
import { PATCHDiseaseGroupRequestDto } from "../../dtos/request/patch.disease-group.request.dto";
import { POSTDiseaseGroupRequestDto } from "../../dtos/request/post.disease-group.request.dto";

describe('DiseaseGroupManagementService', () => {
  let service: DiseaseGroupManagementService;
  let repository: jest.Mocked<DiseaseGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupManagementService).compile();

    service = unit;
    repository = unitRef.get(DiseaseGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedGroup = mockDiseaseGroup();
    const mockDto: POSTDiseaseGroupRequestDto = {
      name: "my-mocked-group"
    }

    it('should create a disease groups', async () => {
      repository.create.mockResolvedValueOnce(mockedGroup);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedGroup);
      expect(repository.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('find', () => {
    const mockedGroups = mockDiseaseGroups();
    it('should return an array of disease groups', async () => {
      repository.query.mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        cache: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(mockedGroups),
      } as any);

      const result = await service.find();

      expect(result).toEqual(mockedGroups);
      expect(repository.query).toHaveBeenCalledTimes(1);
      expect(repository.query).toHaveBeenCalledWith('group');
    });

  });

  describe('findOneById', () => {
    const id: number = 1;
    const mockedGroup = mockDiseaseGroup();

    it('should return a disease groups', async () => {
      repository.findOne.mockResolvedValueOnce(mockedGroup);

      const result = await service.findOneById(id);

      expect(result).toEqual(mockedGroup);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;

    const mockDto: PATCHDiseaseGroupRequestDto = {
      name: 'my-updated-mock'
    }

    const mockedGroup = mockDiseaseGroup();

    it('should update a disease group and return it', async () => {
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedGroup);

      const result = await service.updateOne(id, mockDto);

      expect(result).toEqual(mockedGroup);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDto);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a disease group', async () => {

      const result = await service.deleteOne(id);

      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });

});