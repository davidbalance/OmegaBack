/* eslint-disable @typescript-eslint/unbound-method */
import { Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientAddRecordCommand, ClientAddRecordCommandImpl, ClientAddRecordCommandPayload } from "../client-add-record.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("ClientAddRecordCommand", () => {
    let repository: jest.Mocked<ClientRepository>;
    let handler: ClientAddRecordCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        handler = new ClientAddRecordCommandImpl(repository);
    });

    it("should add a record to the client when client exists", async () => {
        const mockClient = {
            patientDni: '1234567890001',
            patientName: 'Test name',
            patientLastname: 'Test lastname',
            addRecord: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientAddRecordCommandPayload = {
            patientDni: "12345678",
            type: 'inicial',
        } as unknown as ClientAddRecordCommandPayload;

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientAddRecordCommandPayload = {
            patientDni: "12345678",
            type: 'inicial',
        } as unknown as ClientAddRecordCommandPayload;

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
