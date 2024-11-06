import { PdfManagerService } from "@/shared/pdf-manager/pdf-manager.service";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { MedicalReportPdfService } from "./medical-report-pdf.service";
import { TestBed } from "@automock/jest";
import { mockMedicalReportEntity } from "../stub/medical-report-entity.stub";
import { fileReportPath } from "@/shared/utils";
import { Path } from "@/shared/nest-ext/path/path.type";
import { FS } from "@/shared/nest-ext/fs/fs.type";
import { NEST_PATH } from "@/shared/nest-ext/path/inject-token";
import { NEST_FS } from "@/shared/nest-ext/fs/inject-token";
import { IFileSystem } from "@/shared/file-system/file-system.interface";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";

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
  let fileSystem: jest.Mocked<IFileSystem>;
  let path: jest.Mocked<Path>;
  let fs: jest.Mocked<FS>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportPdfService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdfService = unitRef.get(PdfManagerService);
    fileSystem = unitRef.get(FILE_SYSTEM);
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('craft', () => {
    const mockedData = mockMedicalReportEntity();
    const mockedPath = '/path/to/file.txt';
    const mockedBuffer = Buffer.from('Test buffer');
    const mockedContent: any = 'My html-content';

    it('should craft a PDF and update the MedicalReportEntity with file address', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValue({ ...mockedData, fileAddress: mockedPath, hasFile: true });
      fileSystem.read.mockResolvedValue(mockedBuffer);
      path.resolve.mockReturnValue(mockedPath);
      fs.readFileSync.mockReturnValue(mockedBuffer);
      pdfService.parseHtml.mockReturnValue(mockedContent);
      pdfService.craft.mockResolvedValue(mockedBuffer);
      fileSystem.write.mockResolvedValue(mockedPath);

      // Act
      const result = await service.craft(mockedData);

      // Assert
      expect(fileSystem.read).toHaveBeenCalledWith(mockedData.doctorSignature);
      expect(path.resolve).toHaveBeenCalledWith('templates/medical-result/medical-report/header.png');
      expect(fs.readFileSync).toHaveBeenCalledWith(mockedPath);
      expect(pdfService.parseHtml).toHaveBeenCalledWith(mockedData.content);
      expect(pdfService.craft).toHaveBeenCalled();
      expect(fileSystem.write).toHaveBeenCalledWith(expect.any(String), mockedBuffer, { extension: '.pdf', filename: mockedData.examName.toLocaleLowerCase().replace(/\s/g, '_') });
      expect(result.fileAddress).toEqual(mockedPath);
      expect(result.hasFile).toBe(true);
    });

    it('should handle errors during PDF generation', async () => {
      // Arrange
      const data = mockMedicalReportEntity();
      path.resolve.mockReturnValue(mockedPath);
      fileSystem.read.mockResolvedValue(mockedBuffer);
      fs.readFileSync.mockImplementation(() => { throw new Error('Failed to read file') });
      repository.findOneAndUpdate.mockResolvedValue({ ...data, fileAddress: null, hasFile: false });

      // Act
      const result = await service.craft(data);

      // Assert
      expect(fs.readFileSync).toHaveBeenCalledWith(mockedPath);
      expect(pdfService.parseHtml).not.toHaveBeenCalled();
      expect(pdfService.craft).not.toHaveBeenCalled();
      expect(fileSystem.write).not.toHaveBeenCalled();
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