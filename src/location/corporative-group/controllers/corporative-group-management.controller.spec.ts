import { TestBed } from "@automock/jest";
import { CorporativeGroupManagementService } from "../services/corporative-group-management.service";
import { CorporativeGroupManagementController } from "./corporative-group-management.controller";
import { mockCorporativeGroups } from "../services/test/stub/corporative-group.stub";
import { GetCorporativeGroupArrayResponseDto } from "../dtos/response/get.corporative-group-array.response.dto";

describe('CorporativeGroupManagementController', () => {
  let controller: CorporativeGroupManagementController;
  let service: jest.Mocked<CorporativeGroupManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupManagementController).compile();

    controller = unit;
    service = unitRef.get(CorporativeGroupManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockCorporativeGroupData = mockCorporativeGroups();
    const mockResponse: GetCorporativeGroupArrayResponseDto = {
      data: mockCorporativeGroupData
    };

    it('should call the service to find all corporative groups', async () => {
      // Arrange
      service.find.mockResolvedValue(mockCorporativeGroupData);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

});