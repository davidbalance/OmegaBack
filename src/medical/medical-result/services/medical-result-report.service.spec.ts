import { TestBed } from "@automock/jest";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultReportService } from "./medical-result-report.service";
import { mockMedicalResultEntity } from "../stub/medical-result-entity.stub";

describe('MedicalResultReportService', () => {
  let service: MedicalResultReportService;
  let repository: jest.Mocked<MedicalResultRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultReportService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a medical result report by ID', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { report: true },
      });
      expect(result).toEqual(mockedResult.report);
    });
  });
});