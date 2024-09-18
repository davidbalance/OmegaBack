import { TestBed } from "@automock/jest";
import { MedicalResultPaginationService } from "../services/medical-result-pagination.service";
import { MedicalResultPaginationController } from "./medical-result-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockMedicalResults } from "../stub/medical-result.stub";

describe('MedicalResultPaginationController', () => {
  let controller: MedicalResultPaginationController;
  let service: jest.Mocked<MedicalResultPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultPaginationController).compile();
    controller = unit;
    service = unitRef.get(MedicalResultPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedMedicalResult = mockMedicalResults();
    const expectedData = { data: mockedMedicalResult };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedMedicalResult);

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