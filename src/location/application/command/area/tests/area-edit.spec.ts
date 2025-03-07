/* eslint-disable @typescript-eslint/unbound-method */
import { Area } from "@omega/location/core/domain/area/area.domain";
import { AreaConflictError, AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { AreaEditCommand } from "../area-edit.command";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("AreaEditCommand", () => {
    let repository: jest.Mocked<AreaRepository>;
    let command: AreaEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<AreaRepository>;

        command = new AreaEditCommand(repository);
    });

    it("should rename an existing area successfully", async () => {
        const payload = { areaId: "123", areaName: "Updated Area" };
        const existingArea = { rename: jest.fn() } as unknown as Area;

        repository.findOneAsync
            .mockResolvedValueOnce(existingArea)
            .mockResolvedValueOnce(null);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenNthCalledWith(1, { filter: [{ field: "id", operator: "eq", value: payload.areaId }] });
        expect(repository.findOneAsync).toHaveBeenNthCalledWith(2, { filter: [{ field: "name", operator: "eq", value: payload.areaName }] });
        expect(existingArea.rename).toHaveBeenCalledWith(payload.areaName);
        expect(repository.saveAsync).toHaveBeenCalledWith(existingArea);
    });

    it("should throw an error if the area does not exist", async () => {
        const payload = { areaId: "123", areaName: "Updated Area" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(AreaNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.areaId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw an error if the new area name already exists", async () => {
        const payload = { areaId: "123", areaName: "Existing Area" };
        const existingArea = { rename: jest.fn() } as unknown as Area;
        const conflictingArea = { name: "Existing Area" } as unknown as Area;

        repository.findOneAsync
            .mockResolvedValueOnce(existingArea)
            .mockResolvedValueOnce(conflictingArea);

        await expect(command.handleAsync(payload)).rejects.toThrow(AreaConflictError);

        expect(repository.findOneAsync).toHaveBeenNthCalledWith(1, { filter: [{ field: "id", operator: "eq", value: payload.areaId }] });
        expect(repository.findOneAsync).toHaveBeenNthCalledWith(2, { filter: [{ field: "name", operator: "eq", value: payload.areaName }] });
        expect(existingArea.rename).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});