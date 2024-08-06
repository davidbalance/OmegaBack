import { TestBed } from "@automock/jest";
import { CorporativeGroupSelectorService } from "../services/corporative-group-selector.service";
import { CorporativeGroupSelectorController } from "./corporative-group-selector.controller";
import { mockCorporativeGroups } from "../services/test/stub/corporative-group.stub";
import { GetCorporativeGroupSelectorOptionArrayResponseDto } from "../dtos/response/get.corporative-group-selector-response.dto";
import { mockCorporativeGroupSelectorOptions } from "../services/test/stub/corporative-group-selector.stub";

describe('CorporativeGroupManagementController', () => {
  let controller: CorporativeGroupSelectorController;
  let service: jest.Mocked<CorporativeGroupSelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupSelectorController).compile();

    controller = unit;
    service = unitRef.get(CorporativeGroupSelectorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const mockedGroups = mockCorporativeGroupSelectorOptions();
    const mockResponse: GetCorporativeGroupSelectorOptionArrayResponseDto = {
      options: mockedGroups
    };

    it('should call the service to find all corporative groups', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedGroups);

      // Act
      const result = await controller.findSelectorOptions();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
});