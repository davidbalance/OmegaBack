/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { EmailDefaultCommand, EmailDefaultCommandPayload } from "../email-default.command";

describe("EmailDefaultCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: EmailDefaultCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new EmailDefaultCommand(repository);
    });

    it("should set an email as default for the client when client exists", async () => {
        const mockClient = {
            addDefaultEmail: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: EmailDefaultCommandPayload = {
            patientDni: "12345678",
            emailId: "email-valid-id",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.addDefaultEmail).toHaveBeenCalledWith(payload.emailId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: EmailDefaultCommandPayload = {
            patientDni: "12345678",
            emailId: "email-valid-id",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
