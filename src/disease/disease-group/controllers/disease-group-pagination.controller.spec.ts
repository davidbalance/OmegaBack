import { TestBed } from "@automock/jest";
import { DiseaseGroupPaginationService } from "../services/disease-group-pagination.service";
import { DiseaseGroupPaginationController } from "./disease-group-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockDiseaseGroups } from "../stub/disease-group.stub";

describe('DiseaseGroupPaginationController', () => {
  let controller: DiseaseGroupPaginationController;
  let service: jest.Mocked<DiseaseGroupPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupPaginationController).compile();
    controller = unit;
    service = unitRef.get(DiseaseGroupPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedGroup = mockDiseaseGroups();
    const expectedData = { data: mockedGroup };

    it('should call the service to create a new disease group', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedGroup);

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

    it('should call the service to update a disease group', async () => {
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