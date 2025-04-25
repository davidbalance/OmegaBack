/* eslint-disable @typescript-eslint/unbound-method */
import { AreaOptionModel } from "@omega/location/core/models/area/area-option.model";
import { AreaFindOptionsQuery, AreaFindOptionsQueryImpl } from "../area-find-options.query";
import { AreaOptionRepository } from "@omega/location/application/repository/model.repositories";

describe("AreaFindOptionsQuery", () => {
    let repository: jest.Mocked<AreaOptionRepository>;
    let queryHandler: AreaFindOptionsQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<AreaOptionRepository>;

        queryHandler = new AreaFindOptionsQueryImpl(repository);
    });

    it("should successfully fetch and map area options to Option format", async () => {
        const areaOptionModels: AreaOptionModel[] = [
            { toOption: jest.fn().mockReturnValue({ areaLabel: "Area 1", areaValue: "area-1" }) },
            { toOption: jest.fn().mockReturnValue({ areaLabel: "Area 2", areaValue: "area-2" }) }
        ] as unknown as AreaOptionModel[];

        repository.findManyAsync.mockResolvedValue(areaOptionModels);

        const result = await queryHandler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([
            { areaLabel: "Area 1", areaValue: "area-1" },
            { areaLabel: "Area 2", areaValue: "area-2" }
        ]);
    });

    it("should return an empty array if no area options are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await queryHandler.handleAsync();

        expect(result).toEqual([]);
    });
});