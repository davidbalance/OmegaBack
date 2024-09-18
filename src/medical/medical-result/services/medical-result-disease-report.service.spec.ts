import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultDiseaseReportService } from "./medical-result-disease-report.service";
import { TestBed } from "@automock/jest";
import { mockMedicalDiseaseYears } from "../stub/medical-disease-year.stub";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/medical-result-disease-report.post.dto";
import { StreamableFile } from "@nestjs/common";

describe('MedicalResultDiseaseReportService', () => {
    let service: MedicalResultDiseaseReportService;
    let repository: jest.Mocked<MedicalResultDiseaseRepository>;
    let excelService: jest.Mocked<ExcelManagerService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultDiseaseReportService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultDiseaseRepository);
        excelService = unitRef.get(ExcelManagerService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCurrentYears', () => {
        it('should return an array of years', async () => {
            // Arrange
            const mockedYears = mockMedicalDiseaseYears();
            const expectedData = mockedYears;
            repository.query.mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                distinct: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedYears)
            } as any);

            // Act
            const result = await service.getCurrentYears();

            // Assert
            expect(repository.query).toHaveBeenCalledTimes(1);
            expect(result).toEqual(expectedData);
        });
    });

    describe('generateReport', () => {
        it('should generate a report', async () => {
            // Arrange
            const searchParam: PostMedicalResultDiseaseReportRequestDto = {
                year: 2022,
                corporativeName: 'Test Corporative',
                companyRuc: '1234567890',
            };
            const mockedDiseases = mockMedicalDiseaseYears();
            const mockedStream = {} as StreamableFile;
            const spyFind = jest.spyOn(service as any, 'find').mockResolvedValue(mockedDiseases);
            excelService.craft.mockResolvedValue(mockedStream);

            // Act
            const result = await service.generateReport(searchParam);

            // Assert
            expect(spyFind).toHaveBeenCalledWith(searchParam);
            expect(excelService.craft).toHaveBeenCalledWith(
                expect.any(Array),
                expect.any(Object),
                expect.any(String),
            );
            expect(result).toEqual(mockedStream);
        });
    });
});