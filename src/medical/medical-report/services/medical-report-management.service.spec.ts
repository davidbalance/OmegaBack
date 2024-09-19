import { MedicalResultManagementService } from "@/medical/medical-result/services/medical-result-management.service";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportManagementService } from "./medical-report-management.service";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { MedicalReportFileManagementService } from "./medical-report-file-management.service";
import { TestBed } from "@automock/jest";
import { PostMedicalReportRequestDto } from "../dtos/request/medical-report.post.dto";
import { mockMedicalReportEntity } from "../stub/medical-report-entity.stub";
import { mockMedicalResult } from "@/medical/medical-result/stub/medical-result.stub";

describe('MedicalReportManagementService', () => {
  let service: MedicalReportManagementService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let pdfService: jest.Mocked<MedicalReportPdfService>;
  let resultService: jest.Mocked<MedicalResultManagementService>;
  let fileService: jest.Mocked<MedicalReportFileManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdfService = unitRef.get(MedicalReportPdfService);
    resultService = unitRef.get(MedicalResultManagementService);
    fileService = unitRef.get(MedicalReportFileManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostMedicalReportRequestDto = {
      medicalResult: 1,
      content: '<h1>Report content</h1>'
    };
    const medicalResultId = mockDto.medicalResult;
    const mockedReport = mockMedicalReportEntity();
    const mockedMedicalResult = mockMedicalResult();
    const mockedDoctor = { doctorDni: '1234567890', doctorFullname: 'Test fullname', doctorSignature: 'stub/signature' };
    const mockedOrder = { id: 1, process: 'Stub process' };
    const mockedLocation = { corporativeName: 'Stub group', companyRuc: '1234567890001', companyName: 'Sutb company', branchName: 'Stub branch' };
    const mockedClient = { dni: '1234567890', name: 'Stub name', lastname: 'Stub lastname', birthday: new Date() };
    const mockedFullname = `${mockedClient.name} ${mockedClient.lastname}`;

    it('should create a medical report', async () => {
      // Arrange
      resultService.findOne.mockResolvedValue(mockedMedicalResult);
      resultService.findDoctor.mockResolvedValue(mockedDoctor);
      resultService.findOrder.mockResolvedValue(mockedOrder);
      resultService.findLocation.mockResolvedValue(mockedLocation);
      resultService.findClient.mockResolvedValue(mockedClient);
      repository.create.mockResolvedValue(mockedReport);
      pdfService.craft.mockResolvedValue(mockedReport);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(resultService.findOne).toHaveBeenCalledWith(medicalResultId);
      expect(resultService.findDoctor).toHaveBeenCalledWith(medicalResultId);
      expect(resultService.findOrder).toHaveBeenCalledWith(medicalResultId);
      expect(resultService.findLocation).toHaveBeenCalledWith(medicalResultId);
      expect(resultService.findClient).toHaveBeenCalledWith(medicalResultId);
      expect(repository.create).toHaveBeenCalledWith({
        content: mockDto.content,
        order: mockedOrder.id,
        companyName: mockedLocation.companyName,
        patientDni: mockedClient.dni,
        patientBirthday: mockedClient.birthday,
        patientFullname: mockedFullname,
        examName: mockedMedicalResult.examName,
        doctorDni: mockedDoctor.doctorDni,
        doctorFullname: mockedDoctor.doctorFullname,
        doctorSignature: mockedDoctor.doctorSignature,
      });
      expect(pdfService.craft).toHaveBeenCalledWith(mockedReport);
      expect(resultService.attachReport).toHaveBeenCalledWith(medicalResultId, mockedReport);
      expect(result).toEqual(mockedReport);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedReport = mockMedicalReportEntity();

    it('should find a medical report by ID', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedReport);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockedReport);
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const mockData: Partial<typeof mockMedicalReportEntity> = {
      content: '<h1>Updated report content</h1>'
    };
    const mockedReport = mockMedicalReportEntity();

    it('should update a medical report', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue(mockedReport);

      // Act
      const result = await service.updateOne(id, mockData);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockData);
      expect(result).toEqual(mockedReport);
    });
  });

  describe('deleteOne', () => {
    const id = 1;
    it('should delete a medical report', async () => {
      // Arrange
      fileService.removeFile.mockResolvedValue(undefined);
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(fileService.removeFile).toHaveBeenCalledWith(id);
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});