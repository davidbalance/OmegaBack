/* eslint-disable @typescript-eslint/unbound-method */
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientFindOneByDniQuery, ClientFindOneByDniQueryPayload } from "../client-find-one-by-dni.query";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";

describe("ClientFindOneByDniQuery", () => {
    let repository: jest.Mocked<ClientRepository>;
    let handler: ClientFindOneByDniQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        handler = new ClientFindOneByDniQuery(repository);
    });

    it("should return the client when patientDni exists", async () => {
        const mockClient: ClientModel = { patientDni: "12345678", name: "John Doe" } as unknown as ClientModel;

        repository.findOneAsync.mockResolvedValue(mockClient);

        const payload: ClientFindOneByDniQueryPayload = {
            patientDni: "12345678",
        };

        const result = await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: payload.patientDni },
        ]);
        expect(result).toBe(mockClient);
    });

    it("should throw ClientNotFoundError when patientDni does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientFindOneByDniQueryPayload = {
            patientDni: "00000000",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: payload.patientDni },
        ]);
    });
});
