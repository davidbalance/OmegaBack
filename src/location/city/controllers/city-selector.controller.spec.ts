import { TestBed } from "@automock/jest";
import { CitySelectorService } from "../services/city-selector.service";
import { CitySelectorController } from "./city-selector.controller";
import { mockCitySelectorOptions } from "../services/test/stub/city-selector";
import { GETSelectorOptionArrayResponseDto } from "../dtos/response/selector.response.dto";

describe('CitySelectorController', () => {
  let controller: CitySelectorController;
  let service: jest.Mocked<CitySelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CitySelectorController).compile();

    controller = unit;
    service = unitRef.get(CitySelectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const mockOptions = mockCitySelectorOptions();
    const mockResponse: GETSelectorOptionArrayResponseDto = { options: mockOptions };

    it('should call the service to find selector options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockOptions);

      // Act
      const result = await controller.findSelectorOptions();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
});