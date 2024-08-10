import { TestBed } from "@automock/jest";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { MedicalResultExternalConnectionController } from "./medical-result-external-connection.controller";
import { mockMedicalResult } from "../services/test/stub/medical-result.stub";
import { GetMedicalResultResponseDto } from "../dtos/response/get.medical-result.response.dto";
import { PostMedicalResultExternalRequestDto } from "../dtos/request/post.medical-result-external.dto";
import { PostMedicalResultResponseDto } from "../dtos/response/post.medical-result.response.dto";
import { PatchMedicalResultFileResponseDto } from "../dtos/response/patch.medical-result-file.response.dto";

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

    describe('findOne', () => {
        const source = 'testSource';
        const key = 'testKey';
        const mockedMedicalResult = mockMedicalResult();
        const expectResult: GetMedicalResultResponseDto = mockedMedicalResult as any;

        it('should call findOne service method with correct parameters', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockedMedicalResult);

            // Act
            const result = await controller.findOne(source, key);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith({ key, source });
            expect(result).toEqual(expectResult);
        });
    });

    describe('create', () => {
        const source = 'testSource';
        const key = 'testKey';
        const mockDto: PostMedicalResultExternalRequestDto = {
            exam: undefined,
            doctor: undefined,
            order: undefined
        }
        const mockFile = {
            buffer: Buffer.from('test'),
            fieldname: 'file',
            originalname: 'test.pdf',
            encoding: '7bit',
            mimetype: 'application/pdf',
            size: 4
        } as any;
        const mockedMedicalResult = mockMedicalResult();
        const expectResult: PostMedicalResultResponseDto = mockedMedicalResult as any;

        it('should call create service method with correct parameters', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedMedicalResult);

            // Act
            const result = await controller.create(source, key, mockDto, mockFile);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, { ...mockDto, file: mockFile });
            expect(result).toEqual(expectResult);
        });
    });

    describe('uploadFile', () => {
        const source = 'testSource';
        const key = 'testKey';
        const mockFile = {
            buffer: Buffer.from('test'),
            fieldname: 'file',
            originalname: 'test.pdf',
            encoding: '7bit',
            mimetype: 'application/pdf',
            size: 4
        } as any;
        const mockedMedicalResult = mockMedicalResult();
        const expectResult: PatchMedicalResultFileResponseDto = mockedMedicalResult as any;

        it('should call findOneAndUpdate service method with correct parameters', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedMedicalResult);

            // Act
            const result = await controller.uploadFile(source, key, {} as any, mockFile);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, { file: mockFile });
            expect(result).toEqual(expectResult);
        });
    });
});