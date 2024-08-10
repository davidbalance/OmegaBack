import { TestBed } from "@automock/jest";
import { MedicalReportPdfService } from "../services/medical-report-pdf.service";
import { MedicalReportPdfController } from "./medical-report-pdf.controller";

describe('MedicalReportPdfController', () => {
    let controller: MedicalReportPdfController;
    let service: jest.Mocked<MedicalReportPdfService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalReportPdfController).compile();

        controller = unit;
        service = unitRef.get(MedicalReportPdfService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('recreateAllReports', () => {
        it('should call redoPdfs service method', async () => {
            // Arrange
            service.redoPdfs.mockResolvedValue(undefined);

            // Act
            await controller.recreateAllReports();

            // Assert
            expect(service.redoPdfs).toHaveBeenCalled();
        });
    });

    describe('recreateReportsByPatientDni', () => {
        const dni = '1234567890';

        it('should call redoPdfsByDni service method with correct dni', async () => {
            // Arrange
            service.redoPdfsByDni.mockResolvedValue(undefined);

            // Act
            await controller.recreateReportsByPatientDni(dni);

            // Assert
            expect(service.redoPdfsByDni).toHaveBeenCalledWith(dni);
        });
    });

});