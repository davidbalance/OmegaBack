/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { EmailCreateCommand, EmailCreateCommandPayload } from "../email-create.command";

describe("EmailCreateCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: EmailCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new EmailCreateCommand(repository);
    });

    it("should add an email to the client when client exists", async () => {
        const mockClient = {
            addEmail: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: EmailCreateCommandPayload = {
            patientDni: "12345678",
            email: "test@example.com",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.addEmail).toHaveBeenCalledWith(payload.email);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: EmailCreateCommandPayload = {
            patientDni: "12345678",
            email: "test@example.com",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
