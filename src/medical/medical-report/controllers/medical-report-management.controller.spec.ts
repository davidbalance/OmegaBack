import { TestBed } from "@automock/jest";
import { MedicalReportManagementService } from "../services/medical-report-management.service";
import { MedicalReportManagementController } from "./medical-report-management.controller";
import { PostMedicalReportRequestDto } from "../dtos/request/medical-report.post.dto";
import { mockMedicalReport } from "../stub/medical-report.stub";

describe('MedicalReportManagementController', () => {
    let controller: MedicalReportManagementController;
    let service: jest.Mocked<MedicalReportManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalReportManagementController).compile();

        controller = unit;
        service = unitRef.get(MedicalReportManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a medical report', async () => {
            // Arrange
            const mockDto: PostMedicalReportRequestDto = {
                medicalResult: 1,
                content: '<h1>Report content</h1>'
            };
            const mockedReport = mockMedicalReport();
            const expectedResult = mockedReport;
            service.create.mockResolvedValue(mockedReport);

            // Act
            const result = await controller.create(mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith(mockDto);
            expect(result).toEqual(expectedResult);
        });
    });
});