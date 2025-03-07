/* eslint-disable @typescript-eslint/unbound-method */
import { AreaNotFoundError } from "@omega/location/core/domain/area/errors/area.errors";
import { AreaModel } from "@omega/location/core/models/area/area.model";
import { AreaFindOneQuery, AreaFindOneQueryPayload } from "../area-find-one.query";
import { AreaRepository } from "@omega/location/application/repository/model.repositories";

describe("AreaFindOneQuery", () => {
    let repository: jest.Mocked<AreaRepository>;
    let queryHandler: AreaFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<AreaRepository>;

        queryHandler = new AreaFindOneQuery(repository);
    });

    it("should successfully fetch area by ID", async () => {
        const queryPayload: AreaFindOneQueryPayload = { areaId: "area-1" };
        const area: AreaModel = { id: "area-1", name: "Area 1" } as unknown as AreaModel;

        repository.findOneAsync.mockResolvedValue(area);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'areaId', operator: 'eq', value: queryPayload.areaId }
        ]);
        expect(result).toEqual(area);
    });

    it("should throw AreaNotFoundError if area not found", async () => {
        const queryPayload: AreaFindOneQueryPayload = { areaId: "area-1" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync(queryPayload)).rejects.toThrow(AreaNotFoundError);
    });
});