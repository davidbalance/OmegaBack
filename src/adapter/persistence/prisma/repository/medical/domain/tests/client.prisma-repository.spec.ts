import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { Prisma } from "@prisma/client";
import { ClientPrismaRepository } from "../client.prisma-repository";
import { ClientDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/client.domain-mapper";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientAreaAddedEventPayload, ClientDeletedEventPayload, ClientEditedEventPayload, ClientEmailRemovedEventPayload, ClientEmailSettedAsDefaultEventPayload, ClientIsEvent, ClientJobPositionAddedEventPayload, ClientManagementAddedEventPayload } from "@omega/medical/core/domain/client/events/client.events";
import { Email } from "@omega/medical/core/domain/client/email.domain";
import { Record } from "@omega/medical/core/domain/client/record.domain";
import { RecordDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/record.domain-mapper";

describe("ClientPrismaRepository", () => {
    let repository: ClientPrismaRepository;
    let prisma;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            medicalClient: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            medicalEmail: {
                create: jest.fn(),
                updateMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            medicalRecord: {
                create: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<ClientPrismaRepository>(ClientPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<ClientProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "medicalClient-1" };
            const domainResult = { id: "medicalClient-1" };

            prisma.medicalClient.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(ClientDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.medicalClient.findFirst).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                include: { email: true, records: true },
            });
            expect(ClientDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.medicalClient.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.medicalClient.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Client => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Client);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientEditedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientDeletedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientAddedEmailEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientEmailSettedAsDefault").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientEmailRemovedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientManagementAddedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientAreaAddedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientJobPositionAddedEvent").mockReturnValue(false);
            jest.spyOn(ClientIsEvent, "isClientRecordAddedEvent").mockReturnValue(false);
        });

        it("should call createClient when event is ClientCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "ClientCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createClient").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call editClient when event is ClientEditedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientEditedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientEditedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editClient").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeClient when event is ClientDeletedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientDeletedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientDeletedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeClient").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addEmail when event is ClientAddedEmailEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientAddedEmailEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientAddedEmailEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addEmail").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call setEmailDefault when event is ClientEmailSettedAsDefault", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientEmailSettedAsDefault", value: payload });

            jest.spyOn(ClientIsEvent, "isClientEmailSettedAsDefault").mockReturnValue(true);
            const spy = jest.spyOn(repository, "setEmailDefault").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeEmail when event is ClientEmailRemovedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientEmailRemovedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientEmailRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeEmail").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addManagement when event is ClientManagementAddedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientManagementAddedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientManagementAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addManagement").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addArea when event is ClientAreaAddedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientAreaAddedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientAreaAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addArea").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addJobPosition when event is ClientJobPositionAddedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientJobPositionAddedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientJobPositionAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addJobPosition").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addRecord when event is ClientRecordAddedEvent", async () => {
            const payload = { medicalClientId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "ClientRecordAddedEvent", value: payload });

            jest.spyOn(ClientIsEvent, "isClientRecordAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addRecord").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createClient", () => {
            const value = {} as unknown as Client;
            const mapped: Prisma.MedicalClientUncheckedCreateInput = {
                patientDni: "0123456789",
                patientName: "Patient",
                patientLastname: "Lastname",
                patientBirthday: new Date()
            };

            it('should call Prisma create with mapped client domain data', async () => {
                jest.spyOn(ClientDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createClient(value);

                expect(ClientDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalClient.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.create.mockRejectedValue(Error);

                jest.spyOn(ClientDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createClient(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("editClient", () => {
            const value: ClientEditedEventPayload = {
                patientDni: "0123456789"
            };

            it('should update client data using Prisma update', async () => {
                await repository.editClient(value);

                expect(prisma.medicalClient.update).toHaveBeenCalledWith({
                    where: { patientDni: value.patientDni },
                    data: { ...value }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.update.mockRejectedValue(Error);

                await expect(repository.editClient(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeClient", () => {
            const value: ClientDeletedEventPayload = {
                dni: "0123456789"
            };

            it('should delete the client using Prisma delete by DNI', async () => {
                await repository.removeClient(value);

                expect(prisma.medicalClient.delete).toHaveBeenCalledWith({
                    where: { patientDni: value.dni }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.delete.mockRejectedValue(Error);

                await expect(repository.removeClient(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('addEmail', () => {
            const value: Email = {
                id: "email-id-123"
            } as unknown as Email;

            it('should create a new email using Prisma with mapped email data', async () => {
                await repository.addEmail(value);

                expect(prisma.medicalEmail.create).toHaveBeenCalledWith({ data: value });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalEmail.create.mockRejectedValue(Error);

                await expect(repository.addEmail(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('setEmailDefault', () => {
            const value: ClientEmailSettedAsDefaultEventPayload = {
                clientId: "client-id-123",
                emailId: "email-id-123"
            };

            it('should unset all default emails using Prisma updateMany', async () => {
                await repository.setEmailDefault(value);

                expect(prisma.medicalEmail.updateMany).toHaveBeenCalledWith({ where: { clientId: value.clientId }, data: { default: false } });
            });

            it('should set the given email as default using Prisma update', async () => {
                await repository.setEmailDefault(value);

                expect(prisma.medicalEmail.update).toHaveBeenCalledWith({ where: { id: value.emailId }, data: { default: true } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalEmail.updateMany.mockRejectedValue(Error);

                await expect(repository.setEmailDefault(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeEmail', () => {
            const value: ClientEmailRemovedEventPayload = {
                emailId: "email-id-123"
            };

            it('should delete the email by id using Prisma', async () => {
                await repository.removeEmail(value);

                expect(prisma.medicalEmail.delete).toHaveBeenCalledWith({ where: { id: value.emailId } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalEmail.delete.mockRejectedValue(Error);

                await expect(repository.removeEmail(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addManagement', () => {
            const value: ClientManagementAddedEventPayload = {
                clientId: "client-id-123",
                managementId: "management-id-123",
                managementName: "Management"
            };

            it('should update client with managementId and managementName', async () => {
                await repository.addManagement(value);

                expect(prisma.medicalClient.update).toHaveBeenCalledWith({
                    where: { id: value.clientId },
                    data: { managementId: value.managementId, managementName: value.managementName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.update.mockRejectedValue(Error);

                await expect(repository.addManagement(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addArea', () => {
            const value: ClientAreaAddedEventPayload = {
                clientId: "client-id-123",
                areaId: "area-id-123",
                areaName: "Area"
            };

            it('should update client with areaId and areaName', async () => {
                await repository.addArea(value);

                expect(prisma.medicalClient.update).toHaveBeenCalledWith({
                    where: { id: value.clientId },
                    data: { areaId: value.areaId, areaName: value.areaName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.update.mockRejectedValue(Error);

                await expect(repository.addArea(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addJobPosition', () => {
            const value: ClientJobPositionAddedEventPayload = {
                clientId: "client-id-123",
                jobPosition: "Job Position"
            };

            it('should update client with job position', async () => {
                await repository.addJobPosition(value);

                expect(prisma.medicalClient.update).toHaveBeenCalledWith({
                    where: { id: value.clientId },
                    data: { jobPosition: value.jobPosition }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalClient.update.mockRejectedValue(Error);

                await expect(repository.addJobPosition(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addRecord', () => {
            const value: Record = {} as unknown as Record;
            const mapped: Prisma.MedicalRecordUncheckedCreateInput = {
                filepath: "/path/to/file",
                name: "Record",
                clientId: "client-id-123"
            };

            it('should create a new medical record with mapped record data', async () => {
                jest.spyOn(RecordDomainMapper, "toPrisma").mockReturnValue(mapped);
                await repository.addRecord(value);

                expect(prisma.medicalRecord.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalRecord.create.mockRejectedValue(Error);

                await expect(repository.addRecord(value)).rejects.toThrow(RepositoryError);
            });

        });
    });
});