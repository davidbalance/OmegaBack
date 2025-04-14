/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { EmailRemoveCommand, EmailRemoveCommandPayload } from "../email-remove.command";

describe("EmailRemoveCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: EmailRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new EmailRemoveCommand(repository);
    });

    it("should remove an email from the client when client exists", async () => {
        const mockClient = {
            removeEmail: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: EmailRemoveCommandPayload = {
            patientDni: "12345678",
            emailId: "email-id-123",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.removeEmail).toHaveBeenCalledWith(payload.emailId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: EmailRemoveCommandPayload = {
            patientDni: "12345678",
            emailId: "email-id-123",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});