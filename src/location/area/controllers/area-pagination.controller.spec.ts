import { TestBed } from "@automock/jest";
import { AreaPaginationService } from "../services/area-pagination.service";
import { AreaPaginationController } from "./area-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockAreas } from "../stub/area.stub";

describe('AreaPaginationController', () => {
  let controller: AreaPaginationController;
  let service: jest.Mocked<AreaPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaPaginationController).compile();
    controller = unit;
    service = unitRef.get(AreaPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockAreas();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(subtype, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(subtype, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });
});