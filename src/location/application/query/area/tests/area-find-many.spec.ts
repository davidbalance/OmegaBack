/* eslint-disable @typescript-eslint/unbound-method */
import { AreaRepository } from "@omega/location/application/repository/model.repositories";
import { AreaFindManyQuery, AreaFindManyQueryImpl, AreaFindManyQueryPayload } from "../area-find-many.query";
import { AreaModel } from "@omega/location/core/models/area/area.model";

describe("AreaFindManyQuery", () => {
    let repository: jest.Mocked<AreaRepository>;
    let handler: AreaFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<AreaRepository>;

        handler = new AreaFindManyQueryImpl(repository);
    });

    it("should return a paginated list of areas when a valid query is provided", async () => {
        const mockAreas: AreaModel[] = [
            { id: "area-1", name: "Area 1" },
            { id: "area-2", name: "Area 2" },
        ] as unknown as AreaModel[];
        const mockedCount = 2;

        repository.findManyAsync.mockResolvedValue(mockAreas);
        repository.countAsync.mockResolvedValue(2);

        const query: AreaFindManyQueryPayload = {
            filter: "Test",
            skip: 0,
            limit: 10,
            order: { areaName: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: "areaName", operator: "like", value: query.filter }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([{ field: "areaName", operator: "like", value: query.filter }]);
        expect(result).toEqual({ data: mockAreas, amount: mockedCount });
    });

    it("should return all areas when no filter is provided", async () => {
        const mockAreas: AreaModel[] = [
            { id: "area-1", name: "Area 1" },
            { id: "area-2", name: "Area 2" },
        ] as unknown as AreaModel[];
        const mockedCount = 2;

        repository.findManyAsync.mockResolvedValue(mockAreas);
        repository.countAsync.mockResolvedValue(2);

        const query: AreaFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { areaName: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([]);
        expect(result).toEqual({ data: mockAreas, amount: mockedCount });
    });

    it("should return an empty list if no areas match the filter", async () => {
        const mockedCount = 0;

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(mockedCount);

        const query: AreaFindManyQueryPayload = {
            filter: "Nonexistent",
            skip: 0,
            limit: 10,
            order: { areaName: "asc" },
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: "areaName", operator: "like", value: query.filter }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([{ field: "areaName", operator: "like", value: query.filter }]);
        expect(result).toEqual({ data: [], amount: mockedCount });
    });
});
