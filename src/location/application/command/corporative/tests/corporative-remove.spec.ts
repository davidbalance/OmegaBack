/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeRemoveCommand, CorporativeRemoveCommandPayload } from "../corporative-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("CorporativeRemoveCommand", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let command: CorporativeRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        command = new CorporativeRemoveCommand(repository);
    });

    it("should successfully remove a corporative if it exists", async () => {
        const payload: CorporativeRemoveCommandPayload = { corporativeId: "12345" };
        const mockCorporative = { remove: jest.fn() } as unknown as Corporative;

        repository.findOneAsync.mockResolvedValue(mockCorporative);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(mockCorporative.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockCorporative);
    });

    it("should throw an error if the corporative does not exist", async () => {
        const payload: CorporativeRemoveCommandPayload = { corporativeId: "99999" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});