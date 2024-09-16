import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroupOptionService } from "./corporative-group-option.service";
import { mockCorporativeGroupEntities } from "../stub/corporative-group-entity.stub";

describe('CorporativeGroupOptionService', () => {
  let service: CorporativeGroupOptionService;
  let repository: jest.Mocked<CorporativeGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupOptionService).compile();

    service = unit;
    repository = unitRef.get(CorporativeGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return an array of ExtendedCorporativeGroup', async () => {
      // Arrange
      const mockedData = mockCorporativeGroupEntities();
      repository.find.mockResolvedValue(mockedData);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ relations: { companies: { branches: true } } });
      expect(result).toEqual(mockedData);
    });
  });
});
