/* eslint-disable @typescript-eslint/unbound-method */
import { Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientConflictError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { CreateClientPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";
import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { ClientCreateManyCommand } from "../client-create-many.command";

describe("ClientCreateManyCommand", () => {
    let repository: jest.Mocked<ClientRepository>;
    let userNotify: jest.Mocked<NotificationProvider<CreateClientPayload>>
    let handler: ClientCreateManyCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        userNotify = {
            emitAsync: jest.fn()
        } as unknown as jest.Mocked<NotificationProvider<CreateClientPayload>>

        handler = new ClientCreateManyCommand(repository, userNotify);
    });

    it("should create a client when DNI does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientCreateManyCommandPayload = {
            patientEmail: "stub@email.com",
            patientDni: "0000000000",
            patientName: "Stub client",
            patientLastname: "Stub client",
            patientGender: "male",
            patientRole: "",
            patientBirthday: new Date("2000-01-01")
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).toHaveBeenCalled();
        expect(userNotify.emitAsync).toHaveBeenCalled();
    });

    it("should throw ClientConflictError when client with DNI already exists", async () => {
        repository.findOneAsync.mockResolvedValue({} as Client);

        const payload: ClientCreateManyCommandPayload = {
            patientEmail: "stub@email.com",
            patientDni: "0000000000",
            patientName: "Stub client",
            patientLastname: "Stub client",
            patientGender: "male",
            patientRole: "",
            patientBirthday: new Date("2000-01-01")
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
        expect(userNotify.emitAsync).not.toHaveBeenCalled();
    });
});
