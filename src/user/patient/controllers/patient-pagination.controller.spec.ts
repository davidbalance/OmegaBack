import { TestBed } from "@automock/jest";
import { PatientPaginationService } from "../service/patient-pagination.service";
import { PatientPaginationController } from "./patient-pagination.controller";
import { PostPatientPaginationRequestDto } from "../dtos/request/post.patient-pagination.request.dto";
import { mockFlatPatientArray } from "../service/test/stub/patient-flat.stub";
import { PostPatientPaginationResponseDto } from "../dtos/response/post.patient-pagination.response.dto";

describe('PatientPaginationController', () => {
  let controller: PatientPaginationController;
  let service: jest.Mocked<PatientPaginationService>;
  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientPaginationController).compile();

    controller = unit;
    service = unitRef.get(PatientPaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByFilterAndPagination', () => {
    const mockDto: PostPatientPaginationRequestDto = {
      page: 0,
      limit: 100,
      filter: 'my filter'
    };
    const mockedPatientFlat = mockFlatPatientArray();
    const mockedPages = 1;
    const expectResult: PostPatientPaginationResponseDto = {
      pages: mockedPages,
      data: mockedPatientFlat
    };

    it('should find patients by filter and pagination', async () => {
      // Arrange
      service.findPaginatedDataAndPageCount.mockResolvedValue([mockedPages, mockedPatientFlat]);

      // Act
      const result = await controller.findByFilterAndPagination(mockDto);

      // Assert
      expect(service.findPaginatedDataAndPageCount).toHaveBeenCalledWith(mockDto.page, mockDto.limit, mockDto.filter, undefined);
      expect(result).toEqual(expectResult);
    });
  });
});