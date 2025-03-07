/* eslint-disable @typescript-eslint/unbound-method */
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";
import { ModelRepository } from "@shared/shared/providers";
import { ClientManagementFindOneQuery, ClientManagementFindOneQueryPayload } from "../client-management-find-one.query";

describe("ClientManagementFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<ClientManagementModel>>;
    let handler: ClientManagementFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ClientManagementModel>>;

        handler = new ClientManagementFindOneQuery(repository);
    });

    it("should return a client management model when client exists", async () => {
        const mockClientManagement = {
            patientDni: "12345678",
            managementDetails: "Some management details",
        } as unknown as ClientManagementModel;

        repository.findOneAsync.mockResolvedValue(mockClientManagement);

        const query: ClientManagementFindOneQueryPayload = {
            patientDni: "12345678",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: query.patientDni },
        ]);
        expect(result).toEqual(mockClientManagement);
    });

    it("should throw ClientNotFoundError when client management does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ClientManagementFindOneQueryPayload = {
            patientDni: "12345678",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(ClientNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "patientDni", operator: "eq", value: query.patientDni },
        ]);
    });
});
