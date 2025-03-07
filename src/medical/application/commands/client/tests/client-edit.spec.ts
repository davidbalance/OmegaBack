/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { ClientEditCommand, ClientEditCommandPayload } from "../client-edit.command";

describe("ClientEditCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: ClientEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new ClientEditCommand(repository);
    });

    it("should edit the client when client exists", async () => {
        const mockClient = {
            edit: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientEditCommandPayload = {
            patientDni: "12345678",
            patientName: "Updated Name",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.edit).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientEditCommandPayload = {
            patientDni: "12345678",
            patientName: "Updated Name",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'patientDni', operator: 'eq', value: payload.patientDni }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
