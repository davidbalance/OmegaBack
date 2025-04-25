/* eslint-disable @typescript-eslint/unbound-method */
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaFindOneQuery, ClientAreaFindOneQueryImpl, ClientAreaFindOneQueryPayload } from "../client-area-find-one.query";
import { ClientAreaRepository } from "@omega/medical/application/repository/model.repositories";

describe("ClientAreaFindOneQuery", () => {
    let repository: jest.Mocked<ClientAreaRepository>;
    let handler: ClientAreaFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientAreaRepository>;

        handler = new ClientAreaFindOneQueryImpl(repository);
    });

    it("should return the client area when found", async () => {
        const mockClientArea = { patientDni: "12345678", area: "Test Area" } as unknown as ClientAreaModel;

        repository.findOneAsync.mockResolvedValue(mockClientArea);

        const payload: ClientAreaFindOneQueryPayload = { patientDni: "12345678" };

        const result = await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: payload.patientDni },
        ]);
        expect(result).toBe(mockClientArea);
    });

    it("should throw ClientNotFoundError when client area is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ClientAreaFindOneQueryPayload = { patientDni: "12345678" };

        await expect(handler.handleAsync(payload)).rejects.toThrow(ClientNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: payload.patientDni },
        ]);
    });
});
