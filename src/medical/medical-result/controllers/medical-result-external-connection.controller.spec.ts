import { TestBed } from "@automock/jest";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { MedicalResultExternalConnectionController } from "./medical-result-external-connection.controller";
import { mockMedicalResultEntity } from "../stub/medical-result-entity.stub";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { PostMedicalResultBase64FileRequestDto } from "../dtos/request/external-medical-result-base64-file.post.dto";

describe('MedicalResultExternalConnectionController', () => {
    let controller: MedicalResultExternalConnectionController;
    let service: jest.Mocked<MedicalResultExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(MedicalResultExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findOne', () => {
        it('should find a medical result by external key', async () => {
            // Arrange
            const source = 'test-source';
            const key = 'test-key';
            const mockedResult = mockMedicalResultEntity();
            service.findOne.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.findOne(source, key);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith({ source, key });
            expect(result).toEqual(mockedResult);
        });
    });

    describe('create', () => {
        it('should create a new medical result', async () => {
            // Arrange
            const source = 'test-source';
            const key = 'test-key';
            const data: PostExternalMedicalResultRequestDto = {} as PostExternalMedicalResultRequestDto;
            const file = {} as Express.Multer.File;
            const mockedResult = mockMedicalResultEntity();
            service.create.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.create(source, key, data, file);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, { ...data, file });
            expect(result).toEqual(mockedResult);
        });
    });

    describe('uploadFromBase64', () => {
        it('should upload a file from base64 and update the medical result', async () => {
            // Arrange
            const source = 'test-source';
            const key = 'test-key';
            const data: PostMedicalResultBase64FileRequestDto = {} as PostMedicalResultBase64FileRequestDto;
            const mockedResult = mockMedicalResultEntity();
            service.findOneAndUploadBase64.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.uploadFromBase64(source, key, data);

            // Assert
            expect(service.findOneAndUploadBase64).toHaveBeenCalledWith({ source, key }, data);
            expect(result).toEqual(mockedResult);
        });
    });

    describe('postUploadFileByExternalKey', () => {
        it('should upload a file and update the medical result by external key', async () => {
            // Arrange
            const source = 'test-source';
            const key = 'test-key';
            const file = {} as Express.Multer.File;
            const mockedResult = mockMedicalResultEntity();
            service.findOneAndUpdate.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.postUploadFileByExternalKey(source, key, {} as any, file);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, { file });
            expect(result).toEqual(mockedResult);
        });
    });

    describe('patchUploadFileByExternalKey', () => {
        it('should upload a file and update the medical result by external key', async () => {
            // Arrange
            const source = 'test-source';
            const key = 'test-key';
            const file = {} as Express.Multer.File;
            const mockedResult = mockMedicalResultEntity();
            service.findOneAndUpdate.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.patchUploadFileByExternalKey(source, key, {} as any, file);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, { file });
            expect(result).toEqual(mockedResult);
        });
    });

    describe('uploadFileById', () => {
        it('should upload a file and update the medical result by id', async () => {
            // Arrange
            const id = 1;
            const file = {} as Express.Multer.File;
            const mockedResult = mockMedicalResultEntity();
            service.findOneAndUpdate.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.uploadFileById(id, {} as any, file);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith(id, { file });
            expect(result).toEqual(mockedResult);
        });
    });
});