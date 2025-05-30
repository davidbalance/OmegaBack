/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { OrderCreateCommand, OrderCreateCommandImpl, OrderCreateCommandPayload } from "../order-create.command";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

describe("OrderCreateCommand", () => {
    let aggregateRepository: jest.Mocked<OrderRepository>;
    let client: jest.Mocked<ClientRepository>;
    let commandHandler: OrderCreateCommand;

    beforeEach(() => {
        aggregateRepository = {
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        client = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        commandHandler = new OrderCreateCommandImpl(aggregateRepository, client);
    });

    it("should successfully create an order when a valid patient is found", async () => {
        const orderPayload: OrderCreateCommandPayload = {
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

        client.findOneAsync.mockResolvedValue(patient);
        aggregateRepository.saveAsync.mockResolvedValue(undefined);

        await commandHandler.handleAsync(orderPayload);

        expect(client.findOneAsync).toHaveBeenCalledWith([{ field: 'patientDni', operator: 'eq', value: orderPayload.patientDni }]);
        expect(aggregateRepository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error when patient is not found", async () => {
        const orderPayload: OrderCreateCommandPayload = {
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


        client.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(orderPayload)).rejects.toThrow(ClientNotFoundError);
        expect(client.findOneAsync).toHaveBeenCalledWith([{ field: 'patientDni', operator: 'eq', value: orderPayload.patientDni }]);
        expect(aggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});
