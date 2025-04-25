/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CompanyCreateCommand, CompanyCreateCommandImpl, CompanyCreateCommandPayload } from "../company-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("CompanyCreateCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: CompanyCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new CompanyCreateCommandImpl(repository);
    });

    it("should successfully add a company to an existing corporative", async () => {
        const payload: CompanyCreateCommandPayload = {
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };
        const existingCorporative = { addCompany: jest.fn() } as unknown as Corporative;

        repository.findOneAsync.mockResolvedValue(existingCorporative);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(existingCorporative.addCompany).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(existingCorporative);
    });

    it("should throw an error if the corporative does not exist", async () => {
        const payload: CompanyCreateCommandPayload = {
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});