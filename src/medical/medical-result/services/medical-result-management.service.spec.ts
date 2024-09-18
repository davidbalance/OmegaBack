import { MedicalOrderManagementService } from "@/medical/medical-order/services/medical-order-management.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultManagementService } from "./medical-result-management.service";
import { TestBed } from "@automock/jest";
import { MedicalResultRequestDto } from "../dtos/request/medical-result.base.dto";
import { mockMedicalOrderEntity } from "@/medical/medical-order/stubs/medical-order-entity.stub";
import { mockMedicalResultEntity } from "../stub/medical-result-entity.stub";
import { MedicalReportEntity } from "@/medical/medical-report/entities/medical-report.entity";

describe('MedicalResultManagementService', () => {
  let service: MedicalResultManagementService;
  let repository: jest.Mocked<MedicalResultRepository>;
  let orderService: jest.Mocked<MedicalOrderManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
    orderService = unitRef.get(MedicalOrderManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a medical result', async () => {
      // Arrange
      const mockDto: MedicalResultRequestDto = {
        order: 1,
        examName: 'Test Exam',
        examType: 'Test Type',
        examSubtype: 'Test Subtype',
        doctorDni: '1234567890',
        doctorFullname: 'Test Doctor'
      };
      const mockedOrder = mockMedicalOrderEntity();
      const mockedResult = mockMedicalResultEntity();
      orderService.findOne.mockResolvedValue(mockedOrder);
      repository.create.mockResolvedValue(mockedResult);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(orderService.findOne).toHaveBeenCalledWith(mockDto.order);
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, order: mockedOrder as any });
      expect(result).toEqual({ ...mockedResult, diseases: [], reportId: undefined, reportHasFile: undefined });
    });
  });

  describe('findOne', () => {
    it('should return a medical result by ID', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { order: { client: true }, report: true },
      });
      expect(result).toEqual({
        ...mockedResult,
        reportId: mockedResult.report?.id || undefined,
        reportHasFile: mockedResult.report?.hasFile || undefined,
        diseases: mockedResult.diseases.map((e) => `${e.diseaseName}, ${e.diseaseCommentary}`),
      });
    });
  });

  describe('findDoctor', () => {
    it('should return the doctor information for a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findDoctor(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { order: { client: true } },
      });
      expect(result).toEqual(mockedResult);
    });
  });

  describe('findOrder', () => {
    it('should return the order information for a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findOrder(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { order: true },
      });
      expect(result).toEqual(mockedResult.order);
    });
  });

  describe('findLocation', () => {
    it('should return the location information for a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findLocation(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { order: true },
      });
      expect(result).toEqual(mockedResult.order);
    });
  });

  describe('findClient', () => {
    it('should return the client information for a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedResult = mockMedicalResultEntity();
      repository.findOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.findClient(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { order: { client: true } },
      });
      expect(result).toEqual(mockedResult.order.client);
    });
  });

  describe('updateOne', () => {
    it('should update a medical result', async () => {
      // Arrange
      const id = 1;
      const data = { examName: 'Updated Exam' };
      const mockedResult = mockMedicalResultEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedResult);

      // Act
      const result = await service.updateOne(id, data);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, data);
      expect(result).toEqual({
        ...mockedResult,
        reportId: mockedResult.report.id,
        reportHasFile: mockedResult.report.hasFile,
        diseases: mockedResult.diseases.map((e) => `${e.diseaseName}, ${e.diseaseCommentary}`),
      });
    });
  });

  describe('attachReport', () => {
    it('should attach a report to a medical result', async () => {
      // Arrange
      const id = 1;
      const mockedReport = new MedicalReportEntity();
      repository.findOneAndUpdate.mockResolvedValue(undefined);

      // Act
      await service.attachReport(id, mockedReport);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { report: mockedReport });
    });
  });

  describe('deleteOne', () => {
    it('should delete a medical result', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});