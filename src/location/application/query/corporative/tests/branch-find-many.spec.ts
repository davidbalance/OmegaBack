/* eslint-disable @typescript-eslint/unbound-method */
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchFindManyQuery, BranchFindManyQueryPayload } from "../branch-find-many.query";
import { BranchRepository } from "@omega/location/application/repository/model.repositories";

describe("BranchFindManyQuery", () => {
    let repository: jest.Mocked<BranchRepository>;
    let queryHandler: BranchFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchRepository>;

        queryHandler = new BranchFindManyQuery(repository);
    });

    it("should successfully fetch branches for a company with pagination and ordering", async () => {
        const queryPayload: BranchFindManyQueryPayload = { companyId: "company-1" };

        const branches: BranchModel[] = [
            { id: "branch-1", companyId: "company-1", name: "Branch A" },
            { id: "branch-2", companyId: "company-1", name: "Branch B" }
        ] as unknown as BranchModel[];

        repository.findManyAsync.mockResolvedValue(branches);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [{ field: 'companyId', operator: 'eq', value: queryPayload.companyId }]
        });
        expect(result).toEqual(branches);
    });

    it("should return an empty array if no branches are found for the company", async () => {
        const queryPayload: BranchFindManyQueryPayload = { companyId: "company-1" };

        repository.findManyAsync.mockResolvedValue([]);  // No branches found

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [{ field: 'companyId', operator: 'eq', value: queryPayload.companyId }]
        });
        expect(result).toEqual([]);
    });

    it("should apply a branchName filter when provided", async () => {
        const queryPayload: BranchFindManyQueryPayload = {
            companyId: "company-1",
            filter: "Branch A",
        };

        const branches: BranchModel[] = [
            { id: "branch-1", companyId: "company-1", name: "Branch A" }
        ] as unknown as BranchModel[];

        repository.findManyAsync.mockResolvedValue(branches);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                { field: 'companyId', operator: 'eq', value: queryPayload.companyId },
                { field: 'branchName', operator: 'like', value: queryPayload.filter },
            ]
        });
        expect(result).toEqual(branches);
    });

    it("should return all branches for a company when an empty filter is provided", async () => {
        const queryPayload: BranchFindManyQueryPayload = {
            companyId: "company-1",
            filter: "",
        };

        const branches: BranchModel[] = [
            { id: "branch-1", companyId: "company-1", name: "Branch A" },
            { id: "branch-2", companyId: "company-1", name: "Branch B" },
        ] as unknown as BranchModel[];

        repository.findManyAsync.mockResolvedValue(branches);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [{ field: 'companyId', operator: 'eq', value: queryPayload.companyId }],
        });
        expect(result).toEqual(branches);
    });
});