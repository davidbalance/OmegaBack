import { TestBed } from "@automock/jest";
import { MedicalReportFileManagementService } from "../services/medical-report-file-management.service";
import { MedicalReportFileManagementController } from "./medical-report-file-management.controller";

describe('MedicalReportFileManagementController', () => {
    let controller: MedicalReportFileManagementController;
    let service: jest.Mocked<MedicalReportFileManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalReportFileManagementController).compile();

        controller = unit;
        service = unitRef.get(MedicalReportFileManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('uploadfile', () => {
        it('should upload a file', async () => {
            // Arrange
            const id = 1;
            const file = {
                originalname: 'test.pdf',
                buffer: Buffer.from('test'),
                mimetype: "application/json"
            } as Express.Multer.File;
            service.uploadFile.mockResolvedValue('test/filepath');

            // Act
            const result = await controller.uploadfile(id, {} as any, file);

            // Assert
            expect(service.uploadFile).toHaveBeenCalledWith(id, file);
            expect(result).toEqual({});
        });
    });
});