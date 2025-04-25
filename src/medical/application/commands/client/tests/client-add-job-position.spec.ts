/* eslint-disable @typescript-eslint/unbound-method */
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AggregateRepository } from "@shared/shared/providers";
import { ClientAddJobPositionCommand, ClientAddJobPositionCommandImpl, ClientAddJobPositionCommandPayload } from "../client-add-job-position.command";

describe("ClientAddJobPositionCommand", () => {
    let repository: jest.Mocked<AggregateRepository<ClientProps, Client>>;
    let handler: ClientAddJobPositionCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AggregateRepository<ClientProps, Client>>;

        handler = new ClientAddJobPositionCommandImpl(repository);
    });

    it("should add a job position to the client when client exists", async () => {
        const mockClient = {
            addJobPosition: jest.fn(),
        } as unknown as Client;

        repository.findOneAsync.mockResolvedValue(mockClient);
        repository.saveAsync.mockResolvedValue();

        const payload: ClientAddJobPositionCommandPayload = {
            patientDni: "12345678",
            jobPositionName: "Software Engineer",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(mockClient.addJobPosition).toHaveBeenCalledWith({
            jobPositionName: payload.jobPositionName,
        });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientAddJobPositionCommandPayload = {
            patientDni: "12345678",
            jobPositionName: "Software Engineer",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "patientDni", operator: "eq", value: payload.patientDni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
