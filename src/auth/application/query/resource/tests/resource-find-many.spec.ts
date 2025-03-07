/* eslint-disable @typescript-eslint/unbound-method */
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { ResourceFindManyQuery } from "../resource-find-many.query";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";

describe("ResourceFindManyQuery", () => {
    let resourceRepository: jest.Mocked<ResourceRepository>;
    let query: ResourceFindManyQuery;

    beforeEach(() => {
        resourceRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        query = new ResourceFindManyQuery(resourceRepository);
    });

    it("should return all resources when no filter is provided", async () => {
        const mockResources: ResourceModel[] = [
            { id: "resource1", key: "Resource 1" },
            { id: "resource2", key: "Resource 2" },
        ] as unknown as ResourceModel[];

        resourceRepository.findManyAsync.mockResolvedValue(mockResources);

        const result = await query.handleAsync();

        expect(resourceRepository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual(mockResources);
    });
});
