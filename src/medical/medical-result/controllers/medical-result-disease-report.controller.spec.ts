import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseReportService } from "../services/medical-result-disease-report.service";
import { MedicalResultDiseaseReportController } from "./medical-result-disease-report.controller";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/medical-result-disease-report.post.dto";
import { StreamableFile } from "@nestjs/common";
import { Response } from "express";
import { mockMedicalDiseaseYears } from "../stub/medical-disease-year.stub";

describe('MedicalResultDiseaseReportController', () => {
    let controller: MedicalResultDiseaseReportController;
    let service: jest.Mocked<MedicalResultDiseaseReportService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultDiseaseReportController).compile();

        controller = unit;
        service = unitRef.get(MedicalResultDiseaseReportService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateReport', () => {
        it('should generate a report', async () => {
            // Arrange
            const mockDto: PostMedicalResultDiseaseReportRequestDto = {
                year: 2022,
                corporativeName: 'Test Corporative',
                companyRuc: '1234567890',
            };
            const mockedStream = {} as StreamableFile;
            const mockResponse = {
                set: jest.fn(),
            } as unknown as Response;
            service.generateReport.mockResolvedValue({ getStream: () => mockedStream } as any);

            // Act
            await controller.generateReport(mockDto, mockResponse);

            // Assert
            expect(service.generateReport).toHaveBeenCalledWith(mockDto);
            expect(mockResponse.set).toHaveBeenCalledWith({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="medical-result-disease-report.xlsx"',
            });
        });
    });

    describe('findYears', () => {
        it('should return an array of years', async () => {
            // Arrange
            const mockedYears = mockMedicalDiseaseYears();
            service.getCurrentYears.mockResolvedValue(mockedYears);

            // Act
            const result = await controller.findYears();

            // Assert
            expect(service.getCurrentYears).toHaveBeenCalled();
            expect(result).toEqual({ data: mockedYears });
        });
    });
});