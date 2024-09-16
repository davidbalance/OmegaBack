import { TestBed } from "@automock/jest";
import { DoctorFileManagementService } from "../services/doctor-file-management.service";
import { DoctorFileManagerController } from "./doctor-file-manager.controller";
import { ReadStream } from "fs";
import { Response } from "express";
import { StreamableFile } from "@nestjs/common";

describe('DoctorFileManagerController', () => {
    let controller: DoctorFileManagerController;
    let service: jest.Mocked<DoctorFileManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFileManagerController).compile();

        controller = unit;
        service = unitRef.get(DoctorFileManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findSignature', () => {
        it('should find a signature', async () => {
            // Arrange
            const id = 1;
            const mockedReadStream = {} as ReadStream;
            const response = {
                set: jest.fn(),
            } as unknown as Response;
            service.findFile.mockResolvedValue(mockedReadStream);

            // Act
            const result = await controller.findSignature(id, response);

            // Assert
            expect(service.findFile).toHaveBeenCalledWith(id);
            expect(response.set).toHaveBeenCalledWith({
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="firma.png"',
            });
            expect(result).toBeInstanceOf(StreamableFile);
        });
    });

    describe('uploadSignature', () => {
        it('should upload a signature', async () => {
            // Arrange
            const id = 1;
            const file = {
                originalname: 'test.png',
                buffer: Buffer.from('test'),
            } as Express.Multer.File;
            service.uploadFile.mockResolvedValue(undefined);

            // Act
            const result = await controller.uploadSignature(id, {} as any, file);

            // Assert
            expect(service.uploadFile).toHaveBeenCalledWith(id, file);
            expect(result).toEqual({});
        });
    });
});