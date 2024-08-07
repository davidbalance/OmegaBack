import { TestBed } from "@automock/jest";
import { DiseaseRepository } from "../../repositories/disease.repository";
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

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedDiseaseSelector),
      } as any);
    });

    it('should create a disease', async () => {
      // Arrange
      // Act
      const result = await service.find(group);

      // Assert
      expect(result).toEqual(mockedDiseaseSelector);
      expect(repository.query).toHaveBeenCalledWith('disease');
      expect(repository.query().select).toHaveBeenCalledWith('disease.id', 'key');
      expect(repository.query().addSelect).toHaveBeenCalledWith('disease.name', 'label');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('disease.group', 'group', 'group.id = :groupId', { groupId: group });
      expect(repository.query().where).toHaveBeenCalledWith('group.status = :status', { status: true });
      expect(repository.query().getRawMany).toHaveBeenCalled();
    });
  });
});