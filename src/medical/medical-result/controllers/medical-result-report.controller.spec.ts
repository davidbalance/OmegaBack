import { TestBed } from "@automock/jest";
import { MedicalResultReportService } from "../services/medical-result-report.service";
import { MedicalResultReportController } from "./medical-result-report.controller";

describe('MedicalResultReportController', () => {
  let controller: MedicalResultReportController;
  let service: jest.Mocked<MedicalResultReportService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultReportController).compile();

    controller = unit;
    service = unitRef.get(MedicalResultReportService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should find and return a medical result report', async () => {
      // Arrange
      const id = 1;
      const mockedResult = { content: '' };
      service.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await controller.find(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockedResult);
    });
  });
});
