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
        const id = 1;
        const fileMock: any = {
            fieldname: 'file',
            originalname: 'test.pdf',
            encoding: '7bit',
            mimetype: 'application/pdf',
            buffer: Buffer.from('test'),
            size: 4
        };

        it('should call uploadFile service method with correct parameters', async () => {
            // Arrange
            service.uploadFile.mockResolvedValue(undefined);

            // Act
            await controller.uploadfile(id, {} as any, fileMock);

            // Assert
            expect(service.uploadFile).toHaveBeenCalledWith(id, fileMock);
        });
    });

});  