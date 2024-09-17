import { mockExternalMedicalOrder } from "@/medical/medical-order/stubs/external-medical-order-entity.stub";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { PatchExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.patch.dto";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultEventService } from "./medical-result-event.service";
import { MedicalResultExternalConnectionService } from "./medical-result-external-connection.service";
import { MedicalResultExternalKeyService } from "./medical-result-external-key.service";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from "@/medical/medical-order/services/medical-order-external-connection.service";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalResultExternalKey } from "../stub/medical-result-external-key.stub";
import { mockMedicalResultEntity } from "../stub/medical-result-entity.stub";
import { PostMedicalResultUrlFileRequestDto } from "../dtos/request/external-medical-result-url-file.post.dto";

describe('MedicalResultExternalConnectionService', () => {
    let service: MedicalResultExternalConnectionService;
    let repository: jest.Mocked<MedicalResultRepository>;
    let externalKeyService: jest.Mocked<MedicalResultExternalKeyService>;
    let storage: jest.Mocked<MedicalResultFileManagementService>;
    let eventService: jest.Mocked<MedicalResultEventService>;
    let orderService: jest.Mocked<IExternalConnectionService<any, any>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultRepository);
        externalKeyService = unitRef.get(MedicalResultExternalKeyService);
        storage = unitRef.get(MedicalResultFileManagementService);
        eventService = unitRef.get(MedicalResultEventService);
        orderService = unitRef.get(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExternalMedicalResultRequestDto = {
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
        const keyParam = { source, key };
        const mockedOrder = mockExternalMedicalOrder();
        const mockedKey = mockMedicalResultExternalKey();
        const mockedResult = mockMedicalResultEntity();
        const expectedValue = mockedResult;

        it('should create a new medical result', async () => {
            // Arrange
            orderService.findOneOrCreate.mockResolvedValue(mockedOrder);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedResult);
            storage.uploadFile.mockResolvedValue(undefined);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            const { order } = data;
            const { key: orderKey, ...expectedOrderData } = order;
            expect(orderService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: orderKey }, expectedOrderData);
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                order: { id: mockedOrder.id },
                externalKey: mockedKey,
                doctorDni: data.doctor.dni,
                doctorFullname: `${data.doctor.name} ${data.doctor.lastname}`,
                doctorSignature: expect.any(String),
                examName: data.exam.name,
                examType: data.exam.type.name,
                examSubtype: data.exam.subtype.name
            });
            expect(eventService.emitMedicalResultCreateEvent).toHaveBeenCalledWith(source, data.doctor, data.exam);
            expect(result).toEqual({ ...expectedValue, hasFile: false });
        });

        it('should remove key and throw error if medical result creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            orderService.findOneOrCreate.mockResolvedValue(mockedOrder);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            const { order } = data;
            const { key: orderKey, ...expectedOrderData } = order;
            expect(orderService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: orderKey }, expectedOrderData);
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                order: { id: mockedOrder.id },
                externalKey: mockedKey,
                doctorDni: data.doctor.dni,
                doctorFullname: `${data.doctor.name} ${data.doctor.lastname}`,
                doctorSignature: expect.any(String),
                examName: data.exam.name,
                examType: data.exam.type.name,
                examSubtype: data.exam.subtype.name
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOne', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const keyParam = { source, key };
        const mockedResult = mockMedicalResultEntity();
        const expectedValue = mockedResult;

        it('should find a medical result by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedResult);
            // Act
            const result = await service.findOne(keyParam);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(result).toEqual(expectedValue);
        });
    });

    it('findOneOrCreate', () => {
        expect(service.findOneOrCreate).toBeDefined()
    });

    describe('findOneAndUpdate', () => {
        const data: PatchExternalMedicalResultRequestDto = {
            file: undefined
        };
        const mockedResult = mockMedicalResultEntity();
        const expectedValue = { ...mockedResult, hasFile: true };

        it('should update a medical result with external key', async () => {
            // Arrange
            const source: string = 'test-source'
            const key = 'test-key';
            const keyParam = { source, key };

            repository.findOne.mockResolvedValue(mockedResult);
            storage.uploadFile.mockResolvedValue(undefined);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(storage.uploadFile).toHaveBeenCalledWith(mockedResult.id, data.file);
            expect(result).toEqual(expectedValue);
        });

        it('should update a medical result with id', async () => {
            // Arrange
            const source: string = 'test-source'
            const key = 'test-key';
            const keyParam = { source, key };

            repository.findOne.mockResolvedValue(mockedResult);
            storage.uploadFile.mockResolvedValue(undefined);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(storage.uploadFile).toHaveBeenCalledWith(mockedResult.id, data.file);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUploadUrl', () => {
        const data: PostMedicalResultUrlFileRequestDto = {
            url: 'https://sample.com/file'
        };
        const mockedResult = mockMedicalResultEntity();
        const expectedValue = { ...mockedResult, hasFile: true };

        it('should update a medical result with external key', async () => {
            // Arrange
            const source: string = 'test-source'
            const key = 'test-key';
            const keyParam = { source, key };

            repository.findOne.mockResolvedValue(mockedResult);
            storage.uploadFromUrl.mockResolvedValue(undefined);
            // Act
            const result = await service.findOneAndUploadUrl(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(storage.uploadFromUrl).toHaveBeenCalledWith(mockedResult.id, data.url);
            expect(result).toEqual(expectedValue);
        });

        it('should update a medical result with id', async () => {
            // Arrange
            const source: string = 'test-source'
            const key = 'test-key';
            const keyParam = { source, key };

            repository.findOne.mockResolvedValue(mockedResult);
            storage.uploadFromUrl.mockResolvedValue(undefined);
            // Act
            const result = await service.findOneAndUploadUrl(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(storage.uploadFromUrl).toHaveBeenCalledWith(mockedResult.id, data.url);
            expect(result).toEqual(expectedValue);
        });
    });
});
