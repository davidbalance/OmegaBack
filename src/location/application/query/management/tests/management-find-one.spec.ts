/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementFindOneQuery, ManagementFindOneQueryImpl, ManagementFindOneQueryPayload } from "../management-find-one.query";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";

describe("ManagementFindOneQuery", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let handler: ManagementFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        handler = new ManagementFindOneQueryImpl(repository);
    });

    it("should retrieve management entity by ID when it exists", async () => {
        const mockManagement: ManagementModel = { managementId: "1", name: "Manager A" } as unknown as ManagementModel;

        repository.findOneAsync.mockResolvedValue(mockManagement);

        const query: ManagementFindOneQueryPayload = { managementId: "1" };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "managementId", operator: "eq", value: query.managementId },
        ]);
        expect(result).toEqual(mockManagement);
    });

    it("should throw ManagementNotFoundError when management entity is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ManagementFindOneQueryPayload = { managementId: "1" };

        await expect(handler.handleAsync(query)).rejects.toThrow(ManagementNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "managementId", operator: "eq", value: query.managementId },
        ]);
    });

    it("should throw an error when the repository fails", async () => {
        repository.findOneAsync.mockRejectedValue(new Error("Repository failure"));

        const query: ManagementFindOneQueryPayload = { managementId: "1" };

        await expect(handler.handleAsync(query)).rejects.toThrow("Repository failure");

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "managementId", operator: "eq", value: query.managementId },
        ]);
    });
});
