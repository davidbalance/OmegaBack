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
        it('should recreate all PDF reports', async () => {
            // Arrange
            service.redoPdfs.mockResolvedValue(undefined);

            // Act
            const result = await controller.recreateAllReports();

            // Assert
            expect(service.redoPdfs).toHaveBeenCalled();
            expect(result).toEqual({});
        });
    });

    describe('recreateReportsByPatientDni', () => {
        it('should recreate PDF reports by patient DNI', async () => {
            // Arrange
            const dni = '1234567890';
            service.redoPdfsByDni.mockResolvedValue(undefined);

            // Act
            const result = await controller.recreateReportsByPatientDni(dni);

            // Assert
            expect(service.redoPdfsByDni).toHaveBeenCalledWith(dni);
            expect(result).toEqual({});
        });
    });
});