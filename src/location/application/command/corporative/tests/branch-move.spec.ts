/* eslint-disable @typescript-eslint/unbound-method */
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { BranchMoveCommand, BranchMoveCommandImpl, BranchMoveCommandPayload } from "../branch-move.command";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";

describe("BranchMoveCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let handler: BranchMoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new BranchMoveCommandImpl(repository);
    });

    it("should successfully move a branch between corporatives", async () => {
        const fromCorporative = { id: "corp-1", moveBranchTo: jest.fn() } as unknown as Corporative;
        const toCorporative = { id: "corp-2" } as unknown as Corporative;

        repository.findOneAsync
            .mockResolvedValueOnce(fromCorporative)
            .mockResolvedValueOnce(toCorporative);

        const payload: BranchMoveCommandPayload = {
            fromCorporativeId: "corp-1",
            fromCompanyId: "comp-1",
            toCorporativeId: "corp-2",
            toCompanyId: "comp-2",
            branchId: "branch-1",
        };

        await handler.handleAsync(payload);

        expect(fromCorporative.moveBranchTo).toHaveBeenCalledWith(toCorporative, payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(fromCorporative);
    });

    it("should throw an error if the fromCorporative does not exist", async () => {
        const payload: BranchMoveCommandPayload = {
            fromCorporativeId: "corp-1",
            fromCompanyId: "comp-1",
            toCorporativeId: "corp-2",
            toCompanyId: "comp-2",
            branchId: "branch-1",
        };

        repository.findOneAsync.mockResolvedValueOnce(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw an error if the toCorporative does not exist", async () => {
        const payload: BranchMoveCommandPayload = {
            fromCorporativeId: "corp-1",
            fromCompanyId: "comp-1",
            toCorporativeId: "corp-2",
            toCompanyId: "comp-2",
            branchId: "branch-1",
        };
        const mockedCorporative = { id: "corp-1", moveBranchTo: jest.fn() } as unknown as Corporative;

        repository.findOneAsync
            .mockResolvedValueOnce(mockedCorporative)
            .mockResolvedValueOnce(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
