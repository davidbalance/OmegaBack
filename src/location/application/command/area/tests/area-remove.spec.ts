/* eslint-disable @typescript-eslint/unbound-method */
import { Area } from "@omega/location/core/domain/area/area.domain";
import { AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { AreaRemoveCommand } from "../area-remove.command";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("AreaRemoveCommand", () => {
    let repository: jest.Mocked<AreaRepository>;
    let command: AreaRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<AreaRepository>;

        command = new AreaRemoveCommand(repository);
    });

    it("should remove an existing area successfully", async () => {
        const payload = { areaId: "123" };
        const existingArea = { remove: jest.fn() } as unknown as Area;

        repository.findOneAsync.mockResolvedValue(existingArea);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.areaId }] });
        expect(existingArea.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(existingArea);
    });

    it("should throw an error if the area does not exist", async () => {
        const payload = { areaId: "123" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(AreaNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.areaId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});