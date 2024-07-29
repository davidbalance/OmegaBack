import { TestBed } from "@automock/jest";
import { DiseaseRepository } from "../../repositories/disease.repository";
import { DiseaseGroupManagementService } from "@/disease/disease-group/services/disease-group-management.service";
import { mockDiseaseGroup } from "@/disease/disease-group/services/test/stub/disease-group.stub";
import { PATCHDiseaseRequestDto, POSTDiseaseRequestDto } from "../../dtos/disease.request.dto";
import { mockDisease, mockDiseases } from "./stub/disease.stub";
import { DiseaseSelectorService } from "../disease-selector.service";
import { mockDiseaseSelectorOptions } from "./stub/disease-selector.stub";

describe('DiseaseSelectorService', () => {
  let service: DiseaseSelectorService;
  let repository: jest.Mocked<DiseaseRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseSelectorService).compile();

    service = unit;
    repository = unitRef.get(DiseaseRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const group: number = 2;
    const mockedDiseaseSelector = mockDiseaseSelectorOptions();

    it('should create a disease', async () => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedDiseaseSelector),
      } as any);

      const result = await service.find(group);

      expect(result).toEqual(mockedDiseaseSelector);
      expect(repository.query).toHaveBeenCalledWith('disease');
    });
  });
});