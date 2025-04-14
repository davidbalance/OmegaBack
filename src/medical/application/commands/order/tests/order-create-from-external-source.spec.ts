/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ClientRepository, OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { OrderCreateFromExternalSourceCommand, OrderCreateFromExternalSourceCommandPayload } from "../order-create-from-external-source.command";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalKeyConflictError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

describe("OrderCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<OrderExternalConnectionRepository>;
    let aggregateRepository: jest.Mocked<OrderRepository>;
    let clientRepository: jest.Mocked<ClientRepository>;
    let commandHandler: OrderCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        aggregateRepository = {
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        clientRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        commandHandler = new OrderCreateFromExternalSourceCommand(
            externalConnectionRepository,
            aggregateRepository,
            clientRepository
        );
    });

    it("should successfully create an order when there is no connection and a valid patient is found", async () => {

        const payload: OrderCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-key',
            patientDni: "12345678A",
            branchName: "valid-branch",
            companyName: "valid-company",
            companyRuc: "1234567890001",
            corporativeName: "valid-corporative",
            doctorDni: "123456789",
            doctorFullname: "Doctor",
            process: "test-process",
            year: 2025
        };

        const patient = { patientId: "patient-1", dni: "12345678A" } as unknown as ClientModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        clientRepository.findOneAsync.mockResolvedValue(patient);
        aggregateRepository.saveAsync.mockResolvedValue(undefined);

        await commandHandler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(clientRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'patientDni', operator: 'eq', value: payload.patientDni }]);
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error when a connection already exists", async () => {
        const mockConnection: OrderExternalConnectionModel = {} as unknown as OrderExternalConnectionModel;
        const payload: OrderCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-key',
            patientDni: "12345678A",
            branchName: "valid-branch",
            companyName: "valid-company",
            companyRuc: "1234567890001",
            corporativeName: "valid-corporative",
            doctorDni: "123456789",
            doctorFullname: "Doctor",
            process: "test-process",
            year: 2025
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockConnection);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(OrderExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(clientRepository.findOneAsync).not.toHaveBeenCalled();
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw an error when patient is not found", async () => {
        const payload: OrderCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-key',
            patientDni: "12345678A",
            branchName: "valid-branch",
            companyName: "valid-company",
            companyRuc: "1234567890001",
            corporativeName: "valid-corporative",
            doctorDni: "123456789",
            doctorFullname: "Doctor",
            process: "test-process",
            year: 2025
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        clientRepository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.externalKeyValue },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
        ]);
        expect(clientRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'patientDni', operator: 'eq', value: payload.patientDni }]);
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});
