import { TestBed } from "@automock/jest";
import { CorporativeGroupPaginationService } from "../services/corporative-group-pagination.service";
import { CorporativeGroupPaginationController } from "./corporative-group-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockCorporativeGroups } from "../stub/corporative-group.stub";

describe('CorporativeGroupPaginationController', () => {
  let controller: CorporativeGroupPaginationController;
  let service: jest.Mocked<CorporativeGroupPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupPaginationController).compile();
    controller = unit;
    service = unitRef.get(CorporativeGroupPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedBranches = mockCorporativeGroups();
    const expectedData = { data: mockedBranches };

    it('should call the service to find an corporative group', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedBranches);

      // Act
      const result = await controller.find(query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count corporative groups', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });
});