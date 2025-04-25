/* eslint-disable @typescript-eslint/unbound-method */
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { ResourceFindOneQuery, ResourceFindOneQueryImpl, ResourceFindOneQueryPayload } from "../resource-find-one.query";

describe("ResourceFindOneQuery", () => {
    let resourceRepository: jest.Mocked<ResourceRepository>;
    let query: ResourceFindOneQuery;

    beforeEach(() => {
        resourceRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        query = new ResourceFindOneQueryImpl(resourceRepository);
    });

    it("should return the resource when a valid resourceId is provided", async () => {
        const payload: ResourceFindOneQueryPayload = { resourceId: "resource1" };
        const mockResource: ResourceModel = {} as unknown as ResourceModel;

        resourceRepository.findOneAsync.mockResolvedValue(mockResource);

        const result = await query.handleAsync(payload);

        expect(resourceRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'resourceId', operator: 'eq', value: "resource1" }]);
        expect(result).toEqual(mockResource);
    });

    it("should throw ResourceNotFoundError when the resourceId does not exist", async () => {
        resourceRepository.findOneAsync.mockResolvedValue(null);

        await expect(query.handleAsync({ resourceId: "nonexistentResource" })).rejects.toThrow(ResourceNotFoundError);
    });
});
