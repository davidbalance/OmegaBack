import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { MedicalResultRepository } from "../../repositories/medical-result.repository";
import { MedicalResultEventService } from "../medical-result-event.service";
import { MedicalResultExternalConnectionService } from "../medical-result-external-connection.service";
import { MedicalResultFileManagementService } from "../medical-result-file-management.service";
import { PostMedicalOrderExternalRequestDto } from "@/medical/medical-order/dtos/request/post.medical-order-external.request.dto";
import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { TestBed } from "@automock/jest";
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from "@/medical/medical-order/services/medical-order-external-connection.service";
import { MedicalResultExternalKeyService } from "../medical-result-external-key.service";
import { mockMedicalOrder } from "@/medical/medical-order/services/test/stub/medical-order.stub";
import { mockMedicalResultExternalKey } from "./stub/medical-result-external-key.stub";
import { PostMedicalResultExternalRequestDto } from "../../dtos/request/post.medical-result-external.dto";
import { mockMedicalResult } from "./stub/medical-result.stub";
import path from "path";
import { signaturePath } from "@/shared/utils";
import { PatchMedicalResultFileRequestDto } from "../../dtos/request/patch.medical-result-file.request.dto";

describe('MedicalResultExternalConnectionService', () => {
    let service: MedicalResultExternalConnectionService;
    let repository: jest.Mocked<MedicalResultRepository>;
    let externalkeyService: jest.Mocked<MedicalResultExternalKeyService>;
    let storageService: jest.Mocked<MedicalResultFileManagementService>;
    let eventService: jest.Mocked<MedicalResultEventService>;
    let orderService: jest.Mocked<IExternalConnectionService<PostMedicalOrderExternalRequestDto, MedicalOrder>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultRepository);
        externalkeyService = unitRef.get(MedicalResultExternalKeyService);
        storageService = unitRef.get(MedicalResultFileManagementService);
        eventService = unitRef.get(MedicalResultEventService);
        orderService = unitRef.get(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const key: ExternalKeyParam = {
            key: 'test-key',
            source: 'test-source'
        };
        const mockedExternalKey = mockMedicalResultExternalKey();
        const mockedDto: PostMedicalResultExternalRequestDto = {
            exam: {
                key: "test-key",
                type: {
                    key: 'test key',
                    name: 'Test'
                },
                name: "Exam"
            },
            doctor: {
                name: "Doctor Name",
                lastname: "Lastname",
                email: "test@email.com",
                dni: "1234567890"
            },
            order: {
                key: "test-key",
                branch: undefined,
                jobPosition: undefined,
                patient: undefined,
                process: "Test process"
            }
        }
        const mockedMedicalResult = mockMedicalResult();
        const mockedMedicalOrder = mockMedicalOrder();
        const mockedFile = {} as Express.Multer.File;

        const expectResult = mockedMedicalResult;
        const expectSignaturePath = path.join(path.resolve(signaturePath({ dni: mockedDto.doctor.dni })), `${mockedDto.doctor.dni}.png`);

        it('should create a new medical result without file', async () => {
            // Arrange
            orderService.findOneOrCreate.mockResolvedValue(mockedMedicalOrder);
            externalkeyService.create.mockResolvedValueOnce(mockedExternalKey);
            repository.create.mockResolvedValue(mockedMedicalResult);

            const { key: medicalOrderKey, ...orderData } = mockedDto.order;

            // Act
            const result = await service.create(key, mockedDto);

            // Assert
            expect(orderService.findOneOrCreate).toHaveBeenCalledWith({ ...key, key: medicalOrderKey }, orderData);
            expect(externalkeyService.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                order: mockedMedicalOrder,
                externalKey: mockedExternalKey,
                doctorDni: mockedDto.doctor.dni,
                doctorFullname: `${mockedDto.doctor.name} ${mockedDto.doctor.lastname}`,
                doctorSignature: expectSignaturePath,
                examName: mockedDto.exam.name,
                examType: mockedDto.exam.type.name,
                examSubtype: null
            });
            expect(eventService.emitMedicalResultCreateEvent).toHaveBeenCalledWith(key.source, mockedDto.doctor, mockedDto.exam);
            expect(storageService.uploadFile).not.toHaveBeenCalled()
            expect(externalkeyService.remove).not.toHaveBeenCalled();
            expect(result).toEqual(expectResult);
        });


        it('should create a new medical result with a file', async () => {
            // Arrange
            orderService.findOneOrCreate.mockResolvedValue(mockedMedicalOrder);
            externalkeyService.create.mockResolvedValueOnce(mockedExternalKey);
            repository.create.mockResolvedValue(mockedMedicalResult);

            const { key: medicalOrderKey, ...orderData } = mockedDto.order;

            // Act
            const result = await service.create(key, { ...mockedDto, file: mockedFile });

            // Assert
            expect(orderService.findOneOrCreate).toHaveBeenCalledWith({ ...key, key: medicalOrderKey }, orderData);
            expect(externalkeyService.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                order: mockedMedicalOrder,
                externalKey: mockedExternalKey,
                doctorDni: mockedDto.doctor.dni,
                doctorFullname: `${mockedDto.doctor.name} ${mockedDto.doctor.lastname}`,
                doctorSignature: expectSignaturePath,
                examName: mockedDto.exam.name,
                examType: mockedDto.exam.type.name,
                examSubtype: null
            });
            expect(eventService.emitMedicalResultCreateEvent).toHaveBeenCalledWith(key.source, mockedDto.doctor, mockedDto.exam);
            expect(storageService.uploadFile).toHaveBeenCalledWith(mockedMedicalResult.id, mockedFile);
            expect(externalkeyService.remove).not.toHaveBeenCalled();
            expect(result).toEqual(expectResult);
        });

        it('should remove the external key if an error occurs', async () => {
            // Arrange
            orderService.findOneOrCreate.mockResolvedValue(mockedMedicalOrder);
            externalkeyService.create.mockResolvedValueOnce(mockedExternalKey);
            repository.create.mockRejectedValue(new Error());

            const { key: medicalOrderKey, ...orderData } = mockedDto.order;

            // Act & Assert
            await expect(service.create(key, mockedDto))
                .rejects
                .toThrowError(Error)
            expect(orderService.findOneOrCreate).toHaveBeenCalledWith({ ...key, key: medicalOrderKey }, orderData);
            expect(externalkeyService.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                order: mockedMedicalOrder,
                externalKey: mockedExternalKey,
                doctorDni: mockedDto.doctor.dni,
                doctorFullname: `${mockedDto.doctor.name} ${mockedDto.doctor.lastname}`,
                doctorSignature: expectSignaturePath,
                examName: mockedDto.exam.name,
                examType: mockedDto.exam.type.name,
                examSubtype: null
            });
            expect(eventService.emitMedicalResultCreateEvent).not.toHaveBeenCalled()
            expect(storageService.uploadFile).not.toHaveBeenCalled()
            expect(externalkeyService.remove).toHaveBeenCalledWith(key);
        });
    });

    describe('findOne', () => {
        const key: ExternalKeyParam = {
            key: 'test-key',
            source: 'test-source'
        };
        const mockedMedicalResult = mockMedicalResult();

        it('should find one medical result', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedMedicalResult);

            // Act
            const result = await service.findOne(key);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: key } });
            expect(result).toEqual(mockedMedicalResult);
        });
    });

    describe('findOneOrCreate', () => {
        it('should be defined', () => {
            expect(service.findOneOrCreate).toThrowError(Error);
        });
    });

    describe('findOneAndUpdate', () => {
        const key: ExternalKeyParam = {
            key: 'test-key',
            source: 'test-source'
        };
        const mockedDto: PatchMedicalResultFileRequestDto = {
            file: {} as Express.Multer.File
        };
        const mockedMedicalResult = mockMedicalResult();

        it('should update a medical result', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedMedicalResult);
            storageService.uploadFile.mockResolvedValue(undefined);

            // Act
            const result = await service.findOneAndUpdate(key, mockedDto);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: key } });
            expect(storageService.uploadFile).toHaveBeenCalledWith(mockedMedicalResult.id, mockedDto.file);
            expect(result).toEqual(mockedMedicalResult);
        });
    });

});