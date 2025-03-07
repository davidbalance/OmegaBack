/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CompanyRemoveCommand, CompanyRemoveCommandPayload } from "../company-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("CompanyRemoveCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: CompanyRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new CompanyRemoveCommand(repository);
    });

    it("should successfully remove a company from an existing corporative", async () => {
        const payload: CompanyRemoveCommandPayload = {
            corporativeId: "corp-123",
            companyId: "comp-456"
        };
        const existingCorporative = { removeCompany: jest.fn() } as unknown as Corporative;

        repository.findOneAsync.mockResolvedValue(existingCorporative);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(existingCorporative.removeCompany).toHaveBeenCalledWith(payload.companyId);
        expect(repository.saveAsync).toHaveBeenCalledWith(existingCorporative);
    });

    it("should throw an error if the corporative does not exist", async () => {
        const payload: CompanyRemoveCommandPayload = {
            corporativeId: "corp-123",
            companyId: "comp-456",
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});