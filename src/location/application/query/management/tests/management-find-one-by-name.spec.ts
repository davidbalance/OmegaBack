/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementFindOneByNameQuery, ManagementFindOneByNameQueryImpl, ManagementFindOneByNameQueryPayload } from "../management-find-one-by-name.query";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";

describe("ManagementFindOneByNameQuery", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let handler: ManagementFindOneByNameQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        handler = new ManagementFindOneByNameQueryImpl(repository);
    });

    it("should retrieve management entity by name when it exists", async () => {
        const mockManagement: ManagementModel = { managementName: "Manager A", id: "1" } as unknown as ManagementModel;

        repository.findOneAsync.mockResolvedValue(mockManagement);

        const query: ManagementFindOneByNameQueryPayload = { managementName: "Manager A" };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "managementName", operator: "eq", value: query.managementName },
        ]);
        expect(result).toEqual(mockManagement);
    });

    it("should throw ManagementNotFoundError when management entity is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ManagementFindOneByNameQueryPayload = { managementName: "Manager A" };

        await expect(handler.handleAsync(query)).rejects.toThrow(ManagementNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "managementName", operator: "eq", value: query.managementName },
        ]);
    });
});
