/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";
import { ManagementFindManyQuery, ManagementFindManyQueryImpl, ManagementFindManyQueryPayload } from "../management-find-many.query";
import { ManagementModel } from "@omega/location/core/models/management/management.model";

describe("ManagementFindManyQuery", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let handler: ManagementFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        handler = new ManagementFindManyQueryImpl(repository);
    });

    it("should successfully fetch managements with pagination and ordering", async () => {
        const query: ManagementFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { managementName: "asc" },
        };

        const managements: ManagementModel[] = [
            { id: "management-1", managementName: "Manager A" },
            { id: "management-2", managementName: "Manager B" }
        ] as unknown as ManagementModel[];

        repository.findManyAsync.mockResolvedValue(managements);
        repository.countAsync.mockResolvedValue(managements.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [],
        });
        expect(result).toEqual({ data: managements, amount: managements.length });
    });

    it("should return an empty array if no managements are found", async () => {
        const query: ManagementFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { managementName: "asc" },
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await handler.handleAsync(query);

        expect(result).toEqual({ data: [], amount: 0 });
    });

    it("should apply filter when filter is provided", async () => {
        const query: ManagementFindManyQueryPayload = {
            filter: "Manager",
            skip: 0,
            limit: 10,
            order: { managementName: "asc" },
        };

        const managements: ManagementModel[] = [
            { id: "management-1", managementName: "Manager A" }
        ] as unknown as ManagementModel[];

        repository.findManyAsync.mockResolvedValue(managements);
        repository.countAsync.mockResolvedValue(managements.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{ field: 'managementName', operator: 'like', value: query.filter }],
        });
        expect(result).toEqual({ data: managements, amount: managements.length });
    });

    it("should return all managements when no filter is provided", async () => {
        const query: ManagementFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { managementName: "asc" },
        };

        const managements: ManagementModel[] = [
            { id: "management-1", managementName: "Manager A" },
            { id: "management-2", managementName: "Manager B" }
        ] as unknown as ManagementModel[];

        repository.findManyAsync.mockResolvedValue(managements);
        repository.countAsync.mockResolvedValue(managements.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [],
        });
        expect(result).toEqual({ data: managements, amount: managements.length });
    });
});
