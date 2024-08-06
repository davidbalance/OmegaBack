import { TestBed } from "@automock/jest";
import { CompanySelectorService } from "../services/company-selector.service";
import { CompanySelectorController } from "./company-selector.controller";
import { mockCompanySelectorOptions } from "../services/test/stub/company-selector";
import { GetCompanySelectorOptionArrayResponseDto } from "../dtos/response/get.company-selector.response.dto";

describe('CompanySelectorController', () => {
  let controller: CompanySelectorController;
  let service: jest.Mocked<CompanySelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CompanySelectorController).compile();

    controller = unit;
    service = unitRef.get(CompanySelectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const group = 1;
    const mockOptions = mockCompanySelectorOptions();
    const mockResponse: GetCompanySelectorOptionArrayResponseDto = { options: mockOptions };

    it('should call the service to find selector options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockOptions);

      // Act
      const result = await controller.findSelectorOptions(group);

      // Assert
      expect(service.find).toHaveBeenCalledWith(group);
      expect(result).toEqual(mockResponse);
    });
  });
});