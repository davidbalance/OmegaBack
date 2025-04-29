/* eslint-disable @typescript-eslint/unbound-method */
import { Area } from "@omega/location/core/domain/area/area.domain";
import { AreaCreateCommand, AreaCreateCommandImpl } from "../area-create.command";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";
import { AreaConflictError } from "@omega/location/core/domain/area/errors/area.errors";

describe("AreaCreateCommand", () => {
    let repository: jest.Mocked<AreaRepository>;
    let command: AreaCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<AreaRepository>;

        command = new AreaCreateCommandImpl(repository);
    });

    it("should create a new area when no conflict exists", async () => {
        const payload = { name: "New Area" };

        repository.findOneAsync.mockResolvedValue(null);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error when an area with the same name already exists", async () => {
        const payload = { name: "Existing Area" };
        const existingArea = Area.create(payload);

        repository.findOneAsync.mockResolvedValue(existingArea);

        await expect(command.handleAsync(payload)).rejects.toThrow(AreaConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});