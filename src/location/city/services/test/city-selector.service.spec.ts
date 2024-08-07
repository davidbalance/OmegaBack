import { TestBed } from "@automock/jest";
import { CityRepository } from "../../repositories/city.repository";
import { CitySelectorService } from "../city-selector.service";
import { mockCitySelectorOptions } from "./stub/city-selector";

describe('CitySelectorService', () => {
  let service: CitySelectorService;
  let repository: jest.Mocked<CityRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CitySelectorService).compile();

    service = unit;
    repository = unitRef.get(CityRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedCitySelector = mockCitySelectorOptions();

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValueOnce(mockedCitySelector),
      } as any);
    })

    it('should return an array of options based on cities', async () => {
      // Arrange
      // Act
      const result = await service.find();

      // Assert
      expect(result).toEqual(mockedCitySelector);
      expect(repository.query).toHaveBeenCalledWith('city');
      expect(repository.query().select).toHaveBeenCalledWith('city.id', 'key');
      expect(repository.query().addSelect).toHaveBeenCalledWith('city.name', 'label');
      expect(repository.query().getRawMany).toHaveBeenCalled();
    });

  });
});