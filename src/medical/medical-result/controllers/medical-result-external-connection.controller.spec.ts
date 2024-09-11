import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockExternalMedicalResult } from "../stub/external-medical-result.stub";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { MedicalResultExternalConnectionController } from "./medical-result-external-connection.controller";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { TestBed } from "@automock/jest";
import { PatchExternalMedicalResultFileRequestDto } from "../dtos/request/external-medical-result-file.patch.dto";

describe('MedicalResultExternalConnectionController', () => {
    let controller: MedicalResultExternalConnectionController;
    let service: jest.Mocked<MedicalResultExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(MedicalResultExternalConnectionService);
    });

    describe('findOne', () => {
        const source = 'source';
        const key = 'key';
        const mockedResult = mockExternalMedicalResult();
        const expectedValue = mockedResult

        it('should call the service to retrive a medical result', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.findOne(source, key);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith({ source, key });
            expect(result).toEqual(expectedValue);
        });
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const dto: PostExternalMedicalResultRequestDto = {
            doctor: {
                dni: '1234567890',
                name: 'Test Doctor',
                lastname: 'Test Lastname',
                email: "test@email.com"
            },
            exam: {
                key: 'test-exam-key',
                name: 'Test Exam',
                type: {
                    key: 'test-type-key',
                    name: 'Test Type'
                },
                subtype: {
                    key: 'test-subtype-key',
                    name: 'Test Subtype',
                }
            },
            order: {
                key: 'test-order-key',
                branch: {
                    key: 'test-branch-key',
                    name: 'Test Branch',
                    company: {
                        ruc: '1234567890',
                        name: 'Test Company',
                        corporativeGroup: {
                            key: 'test-corporative-group-key',
                            name: 'Test Corporative Group'
                        },
                        key: "test-branch",
                        address: "Test address",
                        phone: "0999999999"
                    },
                    city: "Quito"
                },
                patient: {
                    dni: '1234567890',
                    name: 'Test User',
                    lastname: 'Test Lastname',
                    birthday: new Date(),
                    gender: PatientGenderEnum.MALE,
                    email: "test@email.com"
                },
                jobPosition: {
                    key: 'test-job-position-key',
                    name: 'Test Job Position'
                },
                process: "Test process"
            },
            file: undefined
        };
        const mockedResult = mockExternalMedicalResult();
        const expectedValue = mockedResult;

        it('should call the service to create a new medical result', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.create(source, key, dto, undefined);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, dto);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const data: PatchExternalMedicalResultFileRequestDto = {
            file: undefined
        };
        const mockedResult = mockExternalMedicalResult();
        const expectedValue = mockedResult

        it('should call the service to update a medical result', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedResult);

            // Act
            const result = await controller.uploadFile(source, key, data, undefined);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, { file: undefined });
            expect(result).toEqual(expectedValue);
        });
    });

});