/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { BranchCreateCommand, BranchCreateCommandPayload } from "../branch-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("BranchCreateCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: BranchCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new BranchCreateCommand(repository);
    });

    it("should successfully add a branch to an existing corporative", async () => {
        const payload: BranchCreateCommandPayload = {
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };
        const existingCorporative = { addBranchToCompany: jest.fn() } as unknown as Corporative;

        repository.findOneAsync.mockResolvedValue(existingCorporative);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(existingCorporative.addBranchToCompany).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(existingCorporative);
    });

    it("should throw an error if the corporative does not exist", async () => {
        const payload: BranchCreateCommandPayload = {
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});