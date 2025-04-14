/* eslint-disable @typescript-eslint/unbound-method */
import { CorporativeRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeFindManyQuery, CorporativeFindManyQueryPayload } from "../corporative-find-many.query";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";

describe("CorporativeFindManyQuery", () => {
    let repository: jest.Mocked<CorporativeRepository>;
    let queryHandler: CorporativeFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeRepository>;

        queryHandler = new CorporativeFindManyQuery(repository);
    });

    it("should successfully fetch corporatives with pagination and ordering", async () => {
        const queryPayload: CorporativeFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { corporativeName: "asc" },
        };

        const corporatives: CorporativeModel[] = [
            { id: "corporative-1", corporativeName: "Corporative A" },
            { id: "corporative-2", corporativeName: "Corporative B" }
        ] as unknown as CorporativeModel[];

        repository.findManyAsync.mockResolvedValue(corporatives);
        repository.countAsync.mockResolvedValue(corporatives.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [],
        });
        expect(result).toEqual({ data: corporatives, amount: corporatives.length });
    });

    it("should return an empty array if no corporatives are found", async () => {
        const queryPayload: CorporativeFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { corporativeName: "asc" },
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(result).toEqual({ data: [], amount: 0 });
    });

    it("should apply filter when filter is provided", async () => {
        const queryPayload: CorporativeFindManyQueryPayload = {
            filter: "Corporative A",
            skip: 0,
            limit: 10,
            order: { corporativeName: "asc" },
        };

        const corporatives: CorporativeModel[] = [
            { id: "corporative-1", corporativeName: "Corporative A" }
        ] as unknown as CorporativeModel[];

        repository.findManyAsync.mockResolvedValue(corporatives);
        repository.countAsync.mockResolvedValue(corporatives.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [{ field: 'corporativeName', operator: 'like', value: queryPayload.filter }],
        });
        expect(result).toEqual({ data: corporatives, amount: corporatives.length });
    });

    it("should return all corporatives when no filter is provided", async () => {
        const queryPayload: CorporativeFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { corporativeName: "asc" },
        };

        const corporatives: CorporativeModel[] = [
            { id: "corporative-1", corporativeName: "Corporative A" },
            { id: "corporative-2", corporativeName: "Corporative B" }
        ] as unknown as CorporativeModel[];

        repository.findManyAsync.mockResolvedValue(corporatives);
        repository.countAsync.mockResolvedValue(corporatives.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [],
        });
        expect(result).toEqual({ data: corporatives, amount: corporatives.length });
    });
});
