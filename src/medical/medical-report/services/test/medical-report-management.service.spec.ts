import { MedicalResultManagementService } from "@/medical/medical-result/services/medical-result-management.service";
import { TestBed } from "@automock/jest";
import { MedicalReportRepository } from "../../repositories/medical-report.repository";
import { MedicalReportFileManagementService } from "../medical-report-file-management.service";
import { MedicalReportManagementService } from "../medical-report-management.service";
import { MedicalReportPdfService } from "../medical-report-pdf.service";
import { mockMedicalReport, mockMedicalReportArray } from "./stub/medical-report.stub";
import { mockMedicalResult } from "@/medical/medical-result/services/test/stub/medical-result.stub";
import { PostMedicalReportRequestDto } from "../../dtos/request/post.medical-report.request.dto";
import { MedicalResult } from "@/medical/medical-result/entities/medical-result.entity";
import { mockMedicalOrder } from "@/medical/medical-order/services/test/stub/medical-order.stub";
import { MedicalReport } from "../../entities/medical-report.entity";

describe('MedicalReportManagementService', () => {
  let service: MedicalReportManagementService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let pdf: jest.Mocked<MedicalReportPdfService>;
  let medicalResultService: jest.Mocked<MedicalResultManagementService>;
  let file: jest.Mocked<MedicalReportFileManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdf = unitRef.get(MedicalReportPdfService);
    medicalResultService = unitRef.get(MedicalResultManagementService);
    file = unitRef.get(MedicalReportFileManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostMedicalReportRequestDto = {
      medicalResult: 1,
      content: 'Test content',
    };
    const mockedMedicalResult: MedicalResult = { ...mockMedicalResult(), order: mockMedicalOrder() };
    const mockedReport = mockMedicalReport();
    const expectResult = mockedReport;

    it('should create a new medical report and update medical result with report', async () => {
      // Arrange
      medicalResultService.findOne.mockResolvedValue(mockedMedicalResult);
      repository.create.mockResolvedValue(mockedReport);
      pdf.craft.mockResolvedValue(mockedReport);
      medicalResultService.updateOne.mockResolvedValue(mockedMedicalResult);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(medicalResultService.findOne).toHaveBeenCalledWith(mockDto.medicalResult);
      expect(repository.create).toHaveBeenCalledWith({
        content: mockDto.content,
        order: mockedMedicalResult.order.id,
        companyName: mockedMedicalResult.order.companyName,
        patientDni: mockedMedicalResult.order.client.dni,
        patientBirthday: mockedMedicalResult.order.client.birthday,
        patientFullname: `${mockedMedicalResult.order.client.name} ${mockedMedicalResult.order.client.lastname}`,
        examName: mockedMedicalResult.examName,
        doctorDni: mockedMedicalResult.doctorDni,
        doctorFullname: mockedMedicalResult.doctorFullname,
        doctorSignature: mockedMedicalResult.doctorSignature,
      });
      expect(pdf.craft).toHaveBeenCalledWith(mockedReport);
      expect(medicalResultService.updateOne).toHaveBeenCalledWith(mockDto.medicalResult, { report: mockedReport });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findAll', () => {
    const mockReports = mockMedicalReportArray();

    it('should find all medical reports', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockReports);

      // Act
      const result = await service.findAll();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockReports);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockReport = mockMedicalReport();
    const expectResult = mockReport;

    it('should find a medical report by ID', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockReport);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findByDni', () => {
    const dni = '1234567890';
    const mockReports = mockMedicalReportArray();
    const expectResult = mockReports;

    it('should find medical reports by DNI', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockReports);

      // Act
      const result = await service.findByDni(dni);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { patientDni: dni } });
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockData: Partial<MedicalReport> = {
      content: 'Updated content'
    };
    const mockReport = mockMedicalReport();
    const expectResult = mockReport;

    it('should update a medical report', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue(mockReport);

      // Act
      const result = await service.updateOne(id, mockData);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockData);
      expect(result).toEqual(expectResult);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should delete a medical report', async () => {
      // Arrange
      file.removeFile.mockResolvedValue(undefined);
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(file.removeFile).toHaveBeenCalledWith(id);
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });

});