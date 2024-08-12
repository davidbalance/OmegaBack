import { TestBed } from "@automock/jest";
import { MedicalResultDiseaseReportService } from "../services/medical-result-disease-report.service";
import { MedicalResultDiseaseReportController } from "./medical-result-disease-report.controller";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/post.medical-result-disease-report.request.dto";
import { Response } from "express";

describe('MedicalResultDiseaseReportController', () => {
    let controller: MedicalResultDiseaseReportController;
    let service: jest.Mocked<MedicalResultDiseaseReportService>;
    let response: Partial<Response>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultDiseaseReportController).compile();

        controller = unit;
        service = unitRef.get(MedicalResultDiseaseReportService);
        response = {
            set: jest.fn(),
            pipe: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateReport', () => {
        const mockDto: PostMedicalResultDiseaseReportRequestDto = {
            companyRuc: '1234567890001',
            corporativeName: 'Corporative group',
            year: 2023
        }
        const mockFile: any = {
            getStream: jest.fn().mockReturnThis(),
            pipe: jest.fn()
        };

        it('should call generateReport service method with correct parameters and send the file to the response', async () => {
            // Arrange
            service.generateReport.mockResolvedValue(mockFile);

            // Act
            await controller.generateReport(mockDto, response as Response);

            // Assert
            expect(service.generateReport).toHaveBeenCalledWith(mockDto);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="medical-result-disease-report.xlsx"',
            });
            expect(mockFile.getStream).toHaveBeenCalled();
            expect(mockFile.pipe).toHaveBeenCalled();
        });
    });

    describe('findYears', () => {
        const mockYears = [{ year: 2023 }, { year: 2022 }, { year: 2021 },];
        const expectResult = { data: mockYears };

        it('should call getCurrentYears service method and return the years', async () => {
            // Arrange
            service.getCurrentYears.mockResolvedValue(mockYears);

            // Act
            const result = await controller.findYears();

            // Assert
            expect(service.getCurrentYears).toHaveBeenCalled();
            expect(result).toEqual(expectResult);
        });
    });
});