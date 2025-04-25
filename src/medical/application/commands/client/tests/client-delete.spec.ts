/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { ClientDeleteCommand, ClientDeleteCommandImpl, ClientDeleteCommandPayload } from "../client-delete.command";

describe("ClientDeleteCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: ClientDeleteCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new ClientDeleteCommandImpl(repository);
    });

    it("should delete the client when client exists", async () => {
        const mockClient = {
            remove: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientDeleteCommandPayload = {
            patientDni: "12345678",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'patientDni', operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientDeleteCommandPayload = {
            patientDni: "12345678",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'patientDni', operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
