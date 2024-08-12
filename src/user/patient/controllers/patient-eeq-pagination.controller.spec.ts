import { TestBed } from "@automock/jest";
import { PatientEeqPaginationService } from "../service/patient-eeq-pagination.service";
import { PatientEeqPaginationController } from "./patient-eeq-pagination.controller";
import { PostPatientEeqPaginationRequestDto } from "../dtos/request/post.patient-eeq-pagination.request.dto";
import { mockFlatPatientEeqArray } from "../service/test/stub/patient-eeq-flat.stub";
import { PostPatientEeqPaginationResponseDto } from "../dtos/response/post.patient-eeq-pagination.response.dto";

describe('PatientEeqPaginationController', () => {
  let controller: PatientEeqPaginationController;
  let service: jest.Mocked<PatientEeqPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientEeqPaginationController).compile();

    controller = unit;
    service = unitRef.get(PatientEeqPaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByFilterAndPagination', () => {
    const mockDto: PostPatientEeqPaginationRequestDto = {
      page: 0,
      limit: 100,
      filter: 'my filter'
    };
    const mockedPatientFlat = mockFlatPatientEeqArray();
    const mockedPages = 1;
    const expectResult: PostPatientEeqPaginationResponseDto = {
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