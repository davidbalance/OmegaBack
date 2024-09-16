import { TestBed } from "@automock/jest";
import { ManagementPaginationService } from "../services/management-pagination.service";
import { ManagementPaginationController } from "./management-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockManagements } from "../stub/management.stub";

describe('ManagementPaginationController', () => {
  let controller: ManagementPaginationController;
  let service: jest.Mocked<ManagementPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementPaginationController).compile();
    controller = unit;
    service = unitRef.get(ManagementPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedManagement = mockManagements();
    const expectedData = { data: mockedManagement };

    it('should call the service to find an management', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedManagement);

      // Act
      const result = await controller.find(query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count managements', async () => {
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