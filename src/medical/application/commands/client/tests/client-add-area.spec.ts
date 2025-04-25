/* eslint-disable @typescript-eslint/unbound-method */
import { AggregateRepository } from "@shared/shared/providers";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientAddAreaCommand, ClientAddAreaCommandImpl, ClientAddAreaCommandPayload } from "../client-add-area.command";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

describe("ClientAddAreaCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: ClientAddAreaCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new ClientAddAreaCommandImpl(repository);
    });

    it("should add an area to the client when client exists", async () => {
        const mockClient = {
            addArea: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientAddAreaCommandPayload = {
            patientDni: "12345678",
            areaId: "area-1",
            areaName: "Test Area",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.addArea).toHaveBeenCalledWith({
            areaId: payload.areaId,
            areaName: payload.areaName,
        });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientAddAreaCommandPayload = {
            patientDni: "12345678",
            areaId: "area-1",
            areaName: "Test Area",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
