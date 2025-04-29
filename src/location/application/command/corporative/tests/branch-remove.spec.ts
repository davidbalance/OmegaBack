/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { BranchRemoveCommand, BranchRemoveCommandImpl, BranchRemoveCommandPayload } from "../branch-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("BranchRemoveCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: BranchRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new BranchRemoveCommandImpl(repository);
    });

    it("should successfully remove a branch from an existing corporative", async () => {
        const payload: BranchRemoveCommandPayload = {
            corporativeId: "corp-123",
            branchId: "branch-456",
            companyId: "comp-789"
        };
        const existingCorporative = { removeBranchFromCompany: jest.fn() } as unknown as Corporative;

        repository.findOneAsync.mockResolvedValue(existingCorporative);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(existingCorporative.removeBranchFromCompany).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(existingCorporative);
    });

    it("should throw an error if the corporative does not exist", async () => {
        const payload: BranchRemoveCommandPayload = {
            corporativeId: "corp-123",
            branchId: "branch-456",
            companyId: "comp-789"
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});