import { TestBed } from "@automock/jest";
import { AreaOptionService } from "./area-option.service";
import { AreaRepository } from "../repositories/area.repository";
import { mockAreaEntities } from "../stub/area-entity.stub";

describe('AreaOptionService', () => {
  let service: AreaOptionService;
  let repository: jest.Mocked<AreaRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaOptionService).compile();

    service = unit;
    repository = unitRef.get(AreaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('find', () => {
    it('should return an array of ExtendedArea', async () => {
      // Arrange
      const mockedData = mockAreaEntities();
      repository.find.mockResolvedValue(mockedData);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: { status: true }
      });
      expect(result).toEqual(mockedData);
    });
  });
});