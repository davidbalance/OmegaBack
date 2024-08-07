import { TestBed } from "@automock/jest";
import { BranchSelectorService } from "../services/branch-selector.service";
import { BranchSelectorController } from "./branch-selector.controller";
import { mockBranchSelectorOptions } from "../services/test/stub/branch-selector";
import { GetBranchSelectorOptionArrayResponseDto } from "../dtos/response/get.branch-selector.dto";

describe('BranchSelectorController', () => {
  let controller: BranchSelectorController;
  let service: jest.Mocked<BranchSelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BranchSelectorController).compile();

    controller = unit;
    service = unitRef.get(BranchSelectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const company = 1;
    const mockOptions = mockBranchSelectorOptions();
    const mockResponse: GetBranchSelectorOptionArrayResponseDto = { options: mockOptions };

    it('should call the service to find selector options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockOptions);

      // Act
      const result = await controller.findSelectorOptions(company);

      // Assert
      expect(service.find).toHaveBeenCalledWith(company);
      expect(result).toEqual(mockResponse);
    });
  });
});