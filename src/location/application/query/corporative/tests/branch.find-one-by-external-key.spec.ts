import { BranchExternalConnectionRepository, BranchRepository } from "@omega/location/application/repository/model.repositories";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";
import { BranchNotFoundError } from "@omega/location/core/domain/corporative/errors/branch.errors";
import { BranchFindOneByExternalKeyQuery, BranchFindOneByExternalKeyQueryPayload } from "../branch.find-one-by-external-key.query";

describe("BranchFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<BranchExternalConnectionRepository>;
    let modelRepository: jest.Mocked<BranchRepository>;
    let handler: BranchFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchRepository>;

        handler = new BranchFindOneByExternalKeyQuery(externalConnectionRepository, modelRepository);
    });

    it("Should return an branch model when the branch exists", async () => {
        const mockExternalConnection = { branchId: "branch123" } as unknown as BranchExternalConnectionModel;
        const mockBranch = { branchId: "branch123" } as unknown as BranchModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockBranch);

        const query: BranchFindOneByExternalKeyQueryPayload = {
            owner: "branch-owner",
            value: "branch-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: query.owner },
            { field: 'branchExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchId', operator: 'eq', value: mockExternalConnection.branchId }
        ]);
        expect(result).toEqual(mockBranch);
    });

    it("Should throw BranchExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: BranchFindOneByExternalKeyQueryPayload = {
            owner: "branch-owner",
            value: "branch-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(BranchExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: query.owner },
            { field: 'branchExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw BranchNotFoundError when the external key exists but the branch does not", async () => {
        const mockExternalConnection = { branchId: "branch123" } as unknown as BranchExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: BranchFindOneByExternalKeyQueryPayload = {
            owner: "branch-owner",
            value: "branch-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(BranchNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: query.owner },
            { field: 'branchExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchId', operator: 'eq', value: mockExternalConnection.branchId }
        ]);
    });
});
