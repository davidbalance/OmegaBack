import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../../repository/disease-group.repository";
import { DiseaseGroupSelectorService } from "../disease-group-selector.service";
import { mockDiseaseGroupOptions } from "./stub/disease-group.selector.stub";

describe('DiseaseGroupSelectorService', () => {
  let service: DiseaseGroupSelectorService;
  let repository: jest.Mocked<DiseaseGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupSelectorService).compile();

    service = unit;
    repository = unitRef.get(DiseaseGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedGroup = mockDiseaseGroupOptions();

    it('should return an array of options based on disease groups', async () => {
      repository.query.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValueOnce(mockedGroup),
      } as any);

      const result = await service.find();

      expect(result).toEqual(mockedGroup);
      expect(repository.query).toHaveBeenCalledWith('group');
    });

  });

});