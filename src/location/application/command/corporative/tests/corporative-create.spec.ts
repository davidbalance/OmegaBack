/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeConflictError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeCreateCommand, CorporativeCreateCommandImpl, CorporativeCreateCommandPayload } from "../corporative-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("CorporativeCreateCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: CorporativeCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new CorporativeCreateCommandImpl(repository);
    });

    it("should successfully create a corporative if the name is unique", async () => {
        const payload: CorporativeCreateCommandPayload = { name: "NewCorporative" };

        repository.findOneAsync.mockResolvedValue(null);
        jest.spyOn(Corporative, "create").mockReturnValue({} as Corporative); // Mock domain creation

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(Corporative.create).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error if a corporative with the same name already exists", async () => {
        const payload: CorporativeCreateCommandPayload = { name: "ExistingCorporative" };
        const existingCorporative = {} as Corporative;

        repository.findOneAsync.mockResolvedValue(existingCorporative);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});