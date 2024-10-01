import { TestBed } from "@automock/jest";
import { MedicalResultFileCheckService } from "../services/medical-result-file-check.service";
import { MedicalResultFileCheckController } from "./medical-result-file-check.controller";
import { StreamableFile } from "@nestjs/common";
import { Response } from "express";

describe('MedicalResultFileCheckController', () => {
    let controller: MedicalResultFileCheckController;
    let service: jest.Mocked<MedicalResultFileCheckService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultFileCheckController).compile();

        controller = unit;
        service = unitRef.get(MedicalResultFileCheckService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateReport', () => {
        it('should generate a report', async () => {
            // Arrange
            const mockedStream = {} as StreamableFile;
            const mockResponse = {
                set: jest.fn(),
            } as unknown as Response;
            service.generateReport.mockResolvedValue({ getStream: () => mockedStream } as any);

            // Act
            await controller.generateReport(mockResponse);

            // Assert
            expect(service.generateReport).toHaveBeenCalled();
            expect(mockResponse.set).toHaveBeenCalledWith({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="resultados_medicos_no_encontrados.xlsx"',
            });
        });
    });
});