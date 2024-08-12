import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import { MedicalResultDiseaseRepository } from "../../repositories/medical-result-disease.repository";
import { MedicalResultDiseaseReportService } from "../medical-result-disease-report.service";
import { TestBed } from "@automock/jest";
import { mockMedicalResultYearResponseDtoArray } from "./stub/medical-result-year.stub";
import { PostMedicalResultDiseaseReportRequestDto } from "../../dtos/request/post.medical-result-disease-report.request.dto";
import { mockMedicalResultReportArray } from "./stub/medical-result-report.stub";
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
        const mockedMedicalResultYearResponseDtos = mockMedicalResultYearResponseDtoArray();
        const expectResult = mockedMedicalResultYearResponseDtos;

        beforeEach(() => {
            repository.query.mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                distinct: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedMedicalResultYearResponseDtos)
            } as any);
        });

        it('should return an array of years', async () => {
            // Arrange    
            // Act
            const result = await service.getCurrentYears();

            // Assert
            expect(result).toEqual(expectResult);
        });
    });

    describe('generateReport', () => {
        const mockDto: PostMedicalResultDiseaseReportRequestDto = {
            year: 2023,
            corporativeName: 'Corporative Name',
            companyRuc: '1234567890'
        };
        const mockedMedicalResultReports = mockMedicalResultReportArray();
        const mockedFile: StreamableFile = {} as StreamableFile;
        const expectResult = mockedFile;

        beforeEach(() => {
            repository.query.mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                setParameter: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedMedicalResultReports)
            } as any);
        });

        it('should generate a report', async () => {
            // Arrange
            excelService.craft.mockResolvedValue(mockedFile);

            // Act
            const result = await service.generateReport(mockDto);

            // Assert
            expect(result).toEqual(expectResult);
        });
    });

});  