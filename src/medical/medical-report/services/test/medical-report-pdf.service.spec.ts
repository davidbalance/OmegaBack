import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { MedicalReportRepository } from "../../repositories/medical-report.repository";
import { MedicalReportPdfService } from "../medical-report-pdf.service";
import { TestBed } from "@automock/jest";
import { mockMedicalReport } from "./stub/medical-report.stub";
import { fileReportPath } from "@/shared/utils";
import { PdfManagerService } from "@/shared/pdf-manager/pdf-manager.service";

describe('MedicalReportPdfService', () => {
  let service: MedicalReportPdfService;
  let repository: jest.Mocked<MedicalReportRepository>;
  let pdfService: jest.Mocked<PdfManagerService>;
  let storage: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalReportPdfService).compile();

    service = unit;
    repository = unitRef.get(MedicalReportRepository);
    pdfService = unitRef.get(PdfManagerService);
    storage = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('craft', () => {
    const mockedMedicalReport = mockMedicalReport();
    const mockedStorageOutput: string = "/path/to/file";
    const mockedBuffer = Buffer.from("Testing buffer");
    const mockedHtml = "<h1>Mocked html</h1>";

    const expectFilepath: string = fileReportPath({ dni: mockedMedicalReport.patientDni, order: mockedMedicalReport.order });
    const expectResult = mockedMedicalReport;

    it('should craft a PDF and update medical report with file address', async () => {
      // Arrange
      pdfService.parseHtml.mockReturnValue(mockedHtml);
      pdfService.craft.mockResolvedValue(mockedBuffer);
      storage.saveFile.mockReturnValue(mockedStorageOutput);
      repository.findOneAndUpdate.mockResolvedValue(mockedMedicalReport);

      // Act
      const result = await service.craft(mockedMedicalReport);

      // Assert
      expect(pdfService.parseHtml).toHaveBeenCalledWith(mockedMedicalReport.content);
      expect(pdfService.craft).toHaveBeenCalled();
      expect(storage.saveFile).toHaveBeenCalledWith(mockedBuffer, '.pdf', expectFilepath, mockedMedicalReport.examName.toLocaleLowerCase().replace(/\s/g, '_'));
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: mockedMedicalReport.id }, { fileAddress: mockedStorageOutput, hasFile: true });
      expect(result).toEqual(expectResult);
    });

    it('should update medical report with null file address if PDF crafting fails', async () => {
      // Arrange
      pdfService.parseHtml.mockReturnValue(mockedHtml);
      pdfService.craft.mockRejectedValue(new Error());
      storage.saveFile.mockReturnValue(undefined);
      repository.findOneAndUpdate.mockResolvedValue({ ...mockedMedicalReport, fileAddress: null, hasFile: false });

      // Act
      const result = await service.craft(mockedMedicalReport);

      // Assert
      expect(pdfService.parseHtml).toHaveBeenCalledWith(mockedMedicalReport.content);
      expect(pdfService.craft).toHaveBeenCalled();
      expect(storage.saveFile).not.toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: mockedMedicalReport.id }, { fileAddress: null, hasFile: false });
      expect(result).toEqual({ ...expectResult, fileAddress: null, hasFile: false });
    });
  });
});