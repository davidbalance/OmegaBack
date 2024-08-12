import { TestBed } from "@automock/jest";
import { DoctorFileManagementService } from "../services/doctor-file-management.service";
import { DoctorFileManagerController } from "./doctor-file-manager.controller";
import { Response } from "express";
import { PatchDoctorSignatureRequestDto } from "../dtos/request/patch.doctor-signature.dto";

describe('DoctorFileManagerController', () => {
    let controller: DoctorFileManagerController;
    let service: jest.Mocked<DoctorFileManagementService>;
    let response: Partial<Response>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFileManagerController).compile();

        controller = unit;
        service = unitRef.get(DoctorFileManagementService);
        response = {
            set: jest.fn(),
            pipe: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findSignature', () => {
        const id: number = 1;
        const mockStream: any = {
            getStream: jest.fn().mockReturnThis(),
            pipe: jest.fn()
        }

        it('should find the signature', async () => {
            // Arrange
            service.findFile.mockResolvedValue(mockStream);

            // Act
            await controller.findSignature(id, response as Response);

            // Assert
            expect(service.findFile).toHaveBeenCalledWith(id);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="firma.png"',
            });
            expect(mockStream.getStream).toHaveBeenCalled();
            expect(mockStream.getStream().pipe).toHaveBeenCalledWith(response);
        });
    });

    describe('uploadSignature', () => {
        const id: number = 1;
        const mockDto: PatchDoctorSignatureRequestDto = {
            signature: {} as Express.Multer.File
        };
        const mockedFile: any = {};

        it('should upload the signature', async () => {
            // Arrange
            service.uploadFile.mockResolvedValue(undefined);

            // Act
            const result = await controller.uploadSignature(id, mockDto, mockedFile);

            // Assert
            expect(service.uploadFile).toHaveBeenCalledWith(id, mockedFile);
            expect(result).toEqual({});
        });
    });
});