/* eslint-disable @typescript-eslint/unbound-method */
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { CompanyMoveCommand, CompanyMoveCommandImpl, CompanyMoveCommandPayload } from "../company-move.command";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";

describe("CompanyMoveCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let handler: CompanyMoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new CompanyMoveCommandImpl(repository);
    });

    it("should successfully move a company between corporatives", async () => {
        const fromCorporative = { id: "corp-1", moveCompanyTo: jest.fn() } as unknown as Corporative;
        const toCorporative = { id: "corp-2" } as unknown as Corporative;

        repository.findOneAsync
            .mockResolvedValueOnce(fromCorporative)
            .mockResolvedValueOnce(toCorporative);

        const payload: CompanyMoveCommandPayload = {
            fromCorporativeId: "corp-1",
            toCorporativeId: "corp-2",
            companyId: "company-1",
        };

        await handler.handleAsync(payload);

        expect(fromCorporative.moveCompanyTo).toHaveBeenCalledWith(toCorporative, payload.companyId);
        expect(repository.saveAsync).toHaveBeenCalledWith(fromCorporative);
    });

    it("should throw an error if the fromCorporative does not exist", async () => {
        repository.findOneAsync.mockResolvedValueOnce(null);

        await expect(
            handler.handleAsync({ fromCorporativeId: "corp-1", toCorporativeId: "corp-2", companyId: "company-1" })
        ).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw an error if the toCorporative does not exist", async () => {
        const fromCorporative = { id: "corp-1", moveCompanyTo: jest.fn() } as unknown as Corporative;
        repository.findOneAsync
            .mockResolvedValueOnce(fromCorporative)
            .mockResolvedValueOnce(null);

        const payload: CompanyMoveCommandPayload = {
            fromCorporativeId: "corp-1",
            toCorporativeId: "corp-2",
            companyId: "company-1",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
