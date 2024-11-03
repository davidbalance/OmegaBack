import { PdfManagerService } from "@/shared/pdf-manager/pdf-manager.service";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { TestBed } from "@automock/jest";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { mockMedicalReportEntity } from "../stub/medical-report-entity.stub";
import { fileReportPath } from "@/shared/utils";
import { NestPath } from "@/shared/nest-ext/nest-path/nest-path.type";
import { NestFS } from "@/shared/nest-ext/nest-fs/nest-fs.type";
import { NEST_PATH } from "@/shared/nest-ext/nest-path/inject-token";
import { NEST_FS } from "@/shared/nest-ext/nest-fs/inject-token";

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
  let pdfService: jest.Mocked<PdfManagerService>;
  let storage: jest.Mocked<StorageManager>;
  let path: jest.Mocked<NestPath>;
  let fs: jest.Mocked<NestFS>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportPdfService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdfService = unitRef.get(PdfManagerService);
    storage = unitRef.get(INJECT_STORAGE_MANAGER);
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);
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
      path.resolve.mockReturnValueOnce(signatureDirectory);
      fs.readFileSync.mockReturnValueOnce(signatureImg);
      path.resolve.mockReturnValueOnce(headerDirectory);
      fs.readFileSync.mockReturnValueOnce(headerImg);
      pdfService.parseHtml.mockReturnValue(newContent);

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
      pdfService.craft.mockResolvedValue(buffer);

      const filePath = fileReportPath({ dni: data.patientDni, order: data.order });
      const output = `${filePath}/${data.examName.toLocaleLowerCase().replace(/\s/g, '_')}.pdf`;
      storage.saveFile.mockResolvedValue(output);

      repository.findOneAndUpdate.mockResolvedValue({ ...data, fileAddress: output, hasFile: true });

      // Act
      const result = await service.craft(data);

      // Assert
      expect(fs.readFileSync).toHaveBeenNthCalledWith(1, signatureDirectory);
      expect(fs.readFileSync).toHaveBeenNthCalledWith(2, headerDirectory);
      expect(pdfService.parseHtml).toHaveBeenCalledWith(data.content);
      expect(pdfService.craft).toHaveBeenCalled();
      expect(storage.saveFile).toHaveBeenCalledWith(buffer, '.pdf', filePath, data.examName.toLocaleLowerCase().replace(/\s/g, '_'));
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
      expect(pdfService.parseHtml).not.toHaveBeenCalled();
      expect(pdfService.craft).not.toHaveBeenCalled();
      expect(storage.saveFile).not.toHaveBeenCalled();
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