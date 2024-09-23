/* jest.mock('fs', () => ({
  readFileSync: jest.fn()
}));

jest.mock('path', () => ({
  resolve: jest.fn()
}));
 */

import { PdfManagerService } from "@/shared/pdf-manager/pdf-manager.service";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { TestBed } from "@automock/jest";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { mockMedicalReportEntity } from "../stub/medical-report-entity.stub";
import path from "path";
import fs from "fs";
import { medicalReportDocumentLayout } from "../utils/medical-report-document-layout";
import { fileReportPath } from "@/shared/utils";

jest.mock('dayjs/locale/es', () => { });
jest.mock('dayjs', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    diff: jest.fn(() => 25),
    locale: jest.fn().mockReturnValue({
      format: jest.fn().mockReturnValue('Martes, Enero 1, 2024')
    })
  }))
}));

describe('MedicalReportPdfService', () => {
  let service: MedicalReportPdfService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let pdfManagerService: jest.Mocked<PdfManagerService>;
  let storageManager: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportPdfService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdfManagerService = unitRef.get(PdfManagerService);
    storageManager = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('craft', () => {
    const data = mockMedicalReportEntity();

    const signatureDirectory = '/test/signature/directory';
    const signatureImg = Buffer.from('test-signature-image');
    const signatureBase64 = signatureImg.toString('base64');

    const headerDirectory = 'templates/medical-result/medical-report/header.png';
    const headerImg = Buffer.from('test-header-image');
    const headerBase64 = headerImg.toString('base64');

    const newContent = '<h1>Test Content</h1>';

    it('should craft a PDF report successfully', async () => {
      // Arrange
      const spySignatureResolve = jest.spyOn(path, 'resolve').mockReturnValueOnce(signatureDirectory);
      const spySignatureReadSync = jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(signatureImg);
      const spyHeaderResolve = jest.spyOn(path, 'resolve').mockReturnValueOnce(headerDirectory);
      const spyHeaderReadSync = jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(headerImg);

      pdfManagerService.parseHtml.mockReturnValue(newContent);

      const baseContent = {
        header: `data:image/png;base64,${headerBase64}`,
        title: 'Omega report',
        patientFullname: data.patientFullname,
        patientAge: 25,
        patientDni: data.patientDni,
        date: 'Martes, Enero 1, 2024',
        company: data.companyName,
        examName: data.examName,
        doctorFullname: data.doctorFullname,
        doctorDni: data.doctorDni,
        doctorSignature: `data:image/png;base64,${signatureBase64}`,
      };

      const buffer = Buffer.from('test-pdf-buffer');
      pdfManagerService.craft.mockResolvedValue(buffer);

      const filePath = fileReportPath({ dni: data.patientDni, order: data.order });
      const output = `${filePath}/${data.examName.toLocaleLowerCase().replace(/\s/g, '_')}.pdf`;
      storageManager.saveFile.mockResolvedValue(output);

      repository.findOneAndUpdate.mockResolvedValue({ ...data, fileAddress: output, hasFile: true });

      // Act
      const result = await service.craft(data);

      // Assert
      expect(spySignatureReadSync).toHaveBeenNthCalledWith(1, signatureDirectory);
      expect(spyHeaderReadSync).toHaveBeenNthCalledWith(2, headerDirectory);
      expect(pdfManagerService.parseHtml).toHaveBeenCalledWith(data.content);
      expect(pdfManagerService.craft).toHaveBeenCalled();
      expect(storageManager.saveFile).toHaveBeenCalledWith(buffer, '.pdf', filePath, data.examName.toLocaleLowerCase().replace(/\s/g, '_'));
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: data.id }, { fileAddress: output, hasFile: true });
      expect(result).toEqual({ ...data, fileAddress: output, hasFile: true });
    });

    it('should handle errors during PDF generation', async () => {
      // Arrange
      const data = mockMedicalReportEntity();
      const signatureDirectory = path.resolve(data.doctorSignature);
      const spyReadSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Failed to read file');
      });

      repository.findOneAndUpdate.mockResolvedValue({ ...data, fileAddress: null, hasFile: false });

      // Act
      const result = await service.craft(data);

      // Assert
      expect(spyReadSync).toHaveBeenCalledWith(signatureDirectory);
      expect(pdfManagerService.parseHtml).not.toHaveBeenCalled();
      expect(pdfManagerService.craft).not.toHaveBeenCalled();
      expect(storageManager.saveFile).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: data.id }, { fileAddress: null, hasFile: false });
      expect(result).toEqual({ ...data, fileAddress: null, hasFile: false });
    });
  });

  describe('redoPdf', () => {
    it('should regenerate a PDF report by ID', async () => {
      // Arrange
      const id = 1;
      const data = mockMedicalReportEntity();
      const craftSpy = jest.spyOn(service, 'craft').mockResolvedValue({ ...data, fileAddress: 'test-filepath', hasFile: true });
      repository.findOne.mockResolvedValue(data);

      // Act
      const result = await service.redoPdf(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(craftSpy).toHaveBeenCalledWith(data);
      expect(result).toEqual({ ...data, fileAddress: 'test-filepath', hasFile: true });
    });
  });

  describe('redoPdfsByDni', () => {
    it('should regenerate PDF reports by DNI', async () => {
      // Arrange
      const dni = '1234567890';
      const data = [mockMedicalReportEntity(), mockMedicalReportEntity()];
      const craftSpy = jest.spyOn(service, 'craft').mockResolvedValue({ ...data[0], fileAddress: 'test-filepath-1', hasFile: true });
      repository.find.mockResolvedValue(data);

      // Act
      const result = await service.redoPdfsByDni(dni);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { patientDni: dni } });
      expect(craftSpy).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { ...data[0], fileAddress: 'test-filepath-1', hasFile: true },
        { ...data[0], fileAddress: 'test-filepath-1', hasFile: true }
      ]);
    });
  });

  describe('redoPdfs', () => {
    it('should regenerate all PDF reports', async () => {
      // Arrange
      const data = [mockMedicalReportEntity(), mockMedicalReportEntity()];
      const craftSpy = jest.spyOn(service, 'craft').mockResolvedValue({ ...data[0], fileAddress: 'test-filepath-1', hasFile: true });
      repository.find.mockResolvedValue(data);

      // Act
      const result = await service.redoPdfs();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(craftSpy).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { ...data[0], fileAddress: 'test-filepath-1', hasFile: true },
        { ...data[0], fileAddress: 'test-filepath-1', hasFile: true }
      ]);
    });
  });
});