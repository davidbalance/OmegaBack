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
    const group: number = 1;
    const mockedCitySelector = mockCitySelectorOptions();

    it('should find selector for city', async () => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedCitySelector),
      } as any);

      const result = await service.find(group);

      expect(result).toEqual(mockedCitySelector);
      expect(repository.query).toHaveBeenCalledWith('city');
    });
  });
});