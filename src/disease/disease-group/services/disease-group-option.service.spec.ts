import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";
import { DiseaseGroupOptionService } from "./disease-group-option.service";
import { mockDiseaseGroupEntities } from "../stub/disease-group-entity.stub";

describe('DiseaseGroupOptionService', () => {
  let service: DiseaseGroupOptionService;
  let repository: jest.Mocked<DiseaseGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupOptionService).compile();

    service = unit;
    repository = unitRef.get(DiseaseGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return an array of ExtendedDiseaseGroup', async () => {
      // Arrange
      const mockedData = mockDiseaseGroupEntities();
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockedData),
      } as any);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.query).toHaveBeenCalledWith('group');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('group.diseases', 'disease', 'disease.status = 1');
      expect(repository.query().where).toHaveBeenCalledWith('group.status = 1');
      expect(repository.query().getMany).toHaveBeenCalledWith();
      expect(result).toEqual(mockedData);
    });
  });
});
