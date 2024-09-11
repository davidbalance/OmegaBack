import { MedicalClientExternalService } from "@/medical/medical-client/services/medical-client-external.service";
import { mockMedicalClient } from "@/medical/medical-client/stub/medical-client.stub";
import { TestBed } from "@automock/jest";
import { PatchExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.patch.dto";
import { PostExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.post.dto";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderEventService } from "./medical-order-event.service";
import { MedicalOrderExternalConnectionService } from "./medical-order-external-connection.service";
import { MedicalOrderExternalKeyService } from "./medical-order-external-key.service";
import { mockMedicalOrderEntities, mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalOrderExternalKey } from "../stubs/medical-order-external-key.stub";

describe('MedicalOrderExternalConnectionService', () => {
    let service: MedicalOrderExternalConnectionService;
    let repository: jest.Mocked<MedicalOrderRepository>;
    let externalKeyService: jest.Mocked<MedicalOrderExternalKeyService>;
    let clientService: jest.Mocked<MedicalClientExternalService>;
    let eventService: jest.Mocked<MedicalOrderEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(MedicalOrderRepository);
        externalKeyService = unitRef.get(MedicalOrderExternalKeyService);
        clientService = unitRef.get(MedicalClientExternalService);
        eventService = unitRef.get(MedicalOrderEventService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('find', () => {
        const dni = '1234567890';
        const mockedOrders = mockMedicalOrderEntities();
        const expectedValue = mockedOrders;

        it('should find medical orders by dni', async () => {
            // Arrange
            repository.find.mockResolvedValue(mockedOrders);

            // Act
            const result = await service.find(dni);

            // Assert
            expect(repository.find).toHaveBeenCalledWith({ where: { client: { dni } }, relations: { results: { report: true } } });
            expect(result).toEqual(expectedValue);
        });
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExternalMedicalOrderRequestDto = {
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
                    key: "test-company-key",
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
                key: 'test-job-position',
                name: 'Test jobposition'
            },
            process: "Test process"
        };
        const keyParam = { source, key };
        const mockedClient = mockMedicalClient();
        const mockedKey = mockMedicalOrderExternalKey();
        const mockedOrder = mockMedicalOrderEntity();
        const expectedValue = mockedOrder;

        it('should create a new medical order', async () => {
            // Arrange
            clientService.findOneOrCreate.mockResolvedValue(mockedClient);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedOrder);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(clientService.findOneOrCreate).toHaveBeenCalledWith(keyParam.source, { ...data.patient, jobPosition: data.jobPosition });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { branch, jobPosition, patient, ...expectedData } = data;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                companyRuc: data.branch.company.ruc,
                companyName: data.branch.company.name,
                corporativeName: data.branch.company.corporativeGroup.name,
                branchName: data.branch.name,
                externalKey: mockedKey,
                client: { id: mockedClient.id },
            });
            expect(eventService.emitMedicalOrderCreateEvent).toHaveBeenCalledWith(keyParam.source, data.branch);
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if medical order creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            clientService.findOneOrCreate.mockResolvedValue(mockedClient);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(clientService.findOneOrCreate).toHaveBeenCalledWith(keyParam.source, { ...data.patient, jobPosition: data.jobPosition });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { branch, jobPosition, patient, ...expectedData } = data;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                companyRuc: data.branch.company.ruc,
                companyName: data.branch.company.name,
                corporativeName: data.branch.company.corporativeGroup.name,
                branchName: data.branch.name,
                externalKey: mockedKey,
                client: { id: mockedClient.id },
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOne', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const keyParam = { source, key };
        const mockedOrder = mockMedicalOrderEntity();
        const expectedValue = mockedOrder;

        it('should find a medical order by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedOrder);
            // Act
            const result = await service.findOne(keyParam);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExternalMedicalOrderRequestDto = {
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
                    key: "test-company-key",
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
                key: 'test-job-position',
                name: 'Test jobposition'
            },
            process: "Test process"
        };
        const keyParam = { source, key };
        const mockedOrder = mockMedicalOrderEntity();
        const expectedValue = mockedOrder;

        it('should find a medical order by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedOrder);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new medical order if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedOrder);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: keyParam } });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchExternalMedicalOrderRequestDto = {
            process: "Testing process"
        };
        const keyParam = { source, key };
        const mockedOrder = mockMedicalOrderEntity();
        const expectedValue = mockedOrder;

        it('should update a medical order', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedOrder);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});
