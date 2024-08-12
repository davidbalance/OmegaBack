import { MedicalClientExternalService } from "@/medical/medical-client/services/medical-client-external.service";
import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../../repositories/medical-order.repository";
import { MedicalOrderExternalKeyService } from "../medical-order-external-key.service";
import { ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { PostMedicalOrderExternalRequestDto } from "../../dtos/request/post.medical-order-external.request.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockMedicalOrderExternalKey } from "./stub/medical-order-external-key.stub";
import { mockMedicalClient } from "@/medical/medical-client/services/test/stub/medical-client.stub";
import { mockMedicalOrder } from "./stub/medical-order.stub";
import { MedicalOrderEventService } from "../medical-order-event.service";
import { MedicalOrderExternalConnectionService } from "../medical-order-external-connection.service";
import { NotFoundException } from "@nestjs/common";
import { PatchMedicalOrderRequestDto } from "../../dtos/request/patch.medical-order.request.dto";

describe('MedicalOrderExternalConnectionService', () => {
    let service: MedicalOrderExternalConnectionService;
    let externalkey: jest.Mocked<MedicalOrderExternalKeyService>;
    let repository: jest.Mocked<MedicalOrderRepository>;
    let clientService: jest.Mocked<MedicalClientExternalService>;
    let eventService: jest.Mocked<MedicalOrderEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderExternalConnectionService).compile();

        service = unit;
        externalkey = unitRef.get(MedicalOrderExternalKeyService);
        repository = unitRef.get(MedicalOrderRepository);
        clientService = unitRef.get(MedicalClientExternalService);
        eventService = unitRef.get(MedicalOrderEventService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const key: ExternalKeyParam = {
            source: 'test-source',
            key: 'test-key'
        };
        const data: PostMedicalOrderExternalRequestDto = {
            jobPosition: {
                key: "test-key-job-position",
                name: "Job position"
            },
            patient: {
                email: "test@email.com",
                gender: PatientGenderEnum.MALE,
                birthday: new Date(),
                name: "Name",
                lastname: "Lastname",
                dni: "1234567890"
            },
            branch: {
                key: "test-branch-key",
                company: {
                    key: "test-company-key",
                    corporativeGroup: {
                        key: 'test-corporative-group-key',
                        name: 'Test Corporative Group'
                    },
                    ruc: '1234567890',
                    name: 'Company',
                    address: "Test address",
                    phone: "0999999999"
                },
                name: "Test name",
                city: "Quito"
            },
            process: "Test process"
        };
        const mockedMedicalClient = mockMedicalClient();
        const mockedMedicalOrderExternalKey = mockMedicalOrderExternalKey();
        const mockedMedicalOrder = mockMedicalOrder();

        it('should create a new medical order', async () => {
            // Arrange
            externalkey.create.mockResolvedValueOnce(mockedMedicalOrderExternalKey);
            clientService.findOneOrCreate.mockResolvedValueOnce(mockedMedicalClient);
            repository.create.mockResolvedValueOnce(mockedMedicalOrder);

            const { patient, jobPosition, branch, ...order } = data;

            // Act
            const result = await service.create(key, data);

            // Assert
            expect(result).toEqual(mockedMedicalOrder);
            expect(clientService.findOneOrCreate).toHaveBeenCalledWith(key.source, { ...patient, jobPosition });
            expect(externalkey.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                ...order,
                companyRuc: branch.company.ruc,
                companyName: branch.company.name,
                corporativeName: branch.company.corporativeGroup.name,
                branchName: branch.name,
                externalKey: mockedMedicalOrderExternalKey,
                client: mockedMedicalClient,
            });
            expect(eventService.emitMedicalOrderCreateEvent).toHaveBeenCalledWith(key.source, branch);
            expect(externalkey.remove).not.toHaveBeenCalled();
        });

        it('should rollback the external key if the creation fails', async () => {
            // Arrange
            externalkey.create.mockResolvedValueOnce(mockedMedicalOrderExternalKey);
            clientService.findOneOrCreate.mockResolvedValueOnce(mockedMedicalClient);
            repository.create.mockRejectedValueOnce(new Error());

            const { patient, jobPosition, branch, ...order } = data;

            // Act & Assert
            await expect(service.create(key, data))
                .rejects
                .toThrowError(Error);
            expect(clientService.findOneOrCreate).toHaveBeenCalledWith(key.source, { ...patient, jobPosition });
            expect(externalkey.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                ...order,
                companyRuc: branch.company.ruc,
                companyName: branch.company.name,
                corporativeName: branch.company.corporativeGroup.name,
                branchName: branch.name,
                externalKey: mockedMedicalOrderExternalKey,
                client: mockedMedicalClient,
            });
            expect(eventService.emitMedicalOrderCreateEvent).not.toHaveBeenCalled();
            expect(externalkey.remove).toHaveBeenCalledWith(key);
        });
    });

    describe('findOne', () => {
        const key: ExternalKeyParam = {
            source: 'test-source',
            key: 'test-key'
        };
        const mockedMedicalOrder = mockMedicalOrder();

        it('should find a medical order by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedMedicalOrder);

            // Act
            const result = await service.findOne(key);

            // Assert
            expect(result).toEqual(mockedMedicalOrder);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: key } });
        });
    });

    describe('findOneOrCreate', () => {
        const key: ExternalKeyParam = {
            source: 'test-source',
            key: 'test-key'
        };
        const data: PostMedicalOrderExternalRequestDto = {
            jobPosition: {
                key: "test-key-job-position",
                name: "Job position"
            },
            patient: {
                email: "test@email.com",
                gender: PatientGenderEnum.MALE,
                birthday: new Date(),
                name: "Name",
                lastname: "Lastname",
                dni: "1234567890"
            },
            branch: {
                key: "test-branch-key",
                company: {
                    key: "test-company-key",
                    corporativeGroup: {
                        key: 'test-corporative-group-key',
                        name: 'Test Corporative Group'
                    },
                    ruc: '1234567890',
                    name: 'Company',
                    address: "Test address",
                    phone: "0999999999"
                },
                name: "Test name",
                city: "Quito"
            },
            process: "Test process"
        };
        const mockedMedicalClient = mockMedicalClient();
        const mockedMedicalOrderExternalKey = mockMedicalOrderExternalKey();
        const mockedMedicalOrder = mockMedicalOrder();

        it('should find an existing medical order by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedMedicalOrder);

            // Act
            const result = await service.findOneOrCreate(key, data);

            // Assert
            expect(result).toEqual(mockedMedicalOrder);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: key } });
            expect(clientService.findOneOrCreate).not.toHaveBeenCalled();
            expect(externalkey.create).not.toHaveBeenCalled();
            expect(repository.create).not.toHaveBeenCalled();
            expect(eventService.emitMedicalOrderCreateEvent).not.toHaveBeenCalled();
            expect(externalkey.remove).not.toHaveBeenCalled();
        });

        it('should create a new medical order if it does not exist', async () => {
            // Arrange
            repository.findOne.mockRejectedValueOnce(new NotFoundException);
            externalkey.create.mockResolvedValueOnce(mockedMedicalOrderExternalKey);
            clientService.findOneOrCreate.mockResolvedValueOnce(mockedMedicalClient);
            repository.create.mockResolvedValueOnce(mockedMedicalOrder);

            const { patient, jobPosition, branch, ...order } = data;

            // Act
            const result = await service.findOneOrCreate(key, data);

            // Assert
            expect(result).toEqual(mockedMedicalOrder);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { externalKey: key } });
            expect(clientService.findOneOrCreate).toHaveBeenCalledWith(key.source, { ...patient, jobPosition });
            expect(externalkey.create).toHaveBeenCalledWith(key);
            expect(repository.create).toHaveBeenCalledWith({
                ...order,
                companyRuc: branch.company.ruc,
                companyName: branch.company.name,
                corporativeName: branch.company.corporativeGroup.name,
                branchName: branch.name,
                externalKey: mockedMedicalOrderExternalKey,
                client: mockedMedicalClient,
            });
            expect(eventService.emitMedicalOrderCreateEvent).toHaveBeenCalledWith(key.source, branch);
            expect(externalkey.remove).not.toHaveBeenCalled();
        });
    });

    describe('findOneAndUpdate', () => {
        const key: ExternalKeyParam = {
          source: 'test-source',
          key: 'test-key'
        };
        const data: PatchMedicalOrderRequestDto = {
            process: "Updated process"
        }
        const mockedMedicalOrder = mockMedicalOrder();
    
        it('should update an existing medical order by external key', async () => {
          // Arrange
          repository.findOneAndUpdate.mockResolvedValueOnce(mockedMedicalOrder);
    
          // Act
          const result = await service.findOneAndUpdate(key, data);
    
          // Assert
          expect(result).toEqual(mockedMedicalOrder);
          expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: key }, data);
        });
      });
});