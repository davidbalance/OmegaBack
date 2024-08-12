import { TestBed } from "@automock/jest";
import { MedicalReportManagementService } from "../services/medical-report-management.service";
import { MedicalReportManagementController } from "./medical-report-management.controller";
import { PostMedicalReportRequestDto } from "../dtos/request/post.medical-report.request.dto";
import { mockMedicalReport } from "../services/test/stub/medical-report.stub";
import { PostMedicalReportResponseDto } from "../dtos/response/post.medical-report.response.dto";

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
        const mockDto: PostMedicalReportRequestDto = {
            medicalResult: 1,
            content: "Test content"
        };
        const mockedReport = mockMedicalReport();
        const expectResult: PostMedicalReportResponseDto = mockedReport

        it('should call create service method with correct parameters', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedReport);

            // Act
            const result = await controller.create(mockDto);

            // Assert
            expect(result).toEqual(expectResult);
            expect(service.create).toHaveBeenCalledWith(mockDto);
        });
    });
});