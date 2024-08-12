import { TestBed } from "@automock/jest";
import { MedicalReportSendAttributeRepository } from "../../repositories/medical-report-send-attribute.repository";
import { MedicalReportManagementService } from "../medical-report-management.service";
import { MedicalReportSendService } from "../medical-report-send.service";
import { MedicalReportSendAttribute } from "../../entities/medical-report-send-attribute.entity";
import { mockMedicalReport } from "./stub/medical-report.stub";

describe('MedicalReportSendService', () => {
  let service: MedicalReportSendService;
  let repository: jest.Mocked<MedicalReportSendAttributeRepository>;
  let medicalReportService: jest.Mocked<MedicalReportManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportSendService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportSendAttributeRepository);
    medicalReportService = unitRef.get(MedicalReportManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    const id = 1;
    const value = 'Test value';
    const mockAttribute: MedicalReportSendAttribute = {
      id: 0,
      report: undefined,
      value: "My send attribute",
      createAt: undefined,
      updateAt: undefined
    };
    const mockReport = mockMedicalReport();
    const expectResult = mockReport;

    it('should create a new send attribute, update medical report with send attributes, and return the updated report', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockAttribute);
      medicalReportService.findOne.mockResolvedValue({ ...mockReport, sendAttributes: [] });
      medicalReportService.updateOne.mockResolvedValue(mockReport);

      // Act
      const result = await service.send(id, value);

      // Assert
      expect(repository.create).toHaveBeenCalledWith({ value });
      expect(medicalReportService.findOne).toHaveBeenCalledWith(id);
      expect(medicalReportService.updateOne).toHaveBeenCalledWith(id, { sendAttributes: [...expectResult.sendAttributes, mockAttribute] });
      expect(result).toEqual(expectResult);
    });
  });
});