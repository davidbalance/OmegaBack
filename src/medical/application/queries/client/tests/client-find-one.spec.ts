/* eslint-disable @typescript-eslint/unbound-method */
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ModelRepository } from "@shared/shared/providers";
import { ClientFindOneQuery, ClientFindOneQueryImpl, ClientFindOneQueryPayload } from "../client-find-one.query";

describe("ClientFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<ClientModel>>;
    let handler: ClientFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ClientModel>>;

        handler = new ClientFindOneQueryImpl(repository);
    });

    it("should return a client model when client exists", async () => {
        const mockClient = {
            patientId: "12345678",
            email: "test@example.com",
        } as unknown as ClientModel;

        repository.findOneAsync.mockResolvedValue(mockClient);

        const query: ClientFindOneQueryPayload = {
            clientId: "12345678",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientId", operator: "eq", value: query.clientId },
        ]);
        expect(result).toEqual(mockClient);
    });

    it("should throw ClientNotFoundError when client does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ClientFindOneQueryPayload = {
            clientId: "12345678",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ClientNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientId", operator: "eq", value: query.clientId },
        ]);
    });
});
