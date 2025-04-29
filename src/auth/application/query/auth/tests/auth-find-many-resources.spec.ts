/* eslint-disable @typescript-eslint/unbound-method */
import { AuthResourceRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { AuthFindManyResourcesQuery, AuthFindManyResourcesQueryImpl, AuthFindManyResourcesQueryPayload } from "../auth-find-many-resources.query";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";

describe("AuthFindManyResourcesQuery", () => {
    let repository: jest.Mocked<AuthResourceRepository>;
    let query: AuthFindManyResourcesQuery;

    beforeEach(() => {
        repository = { findManyAsync: jest.fn() } as unknown as jest.Mocked<AuthResourceRepository>;
        query = new AuthFindManyResourcesQueryImpl(repository);
    });

    it("should return resources when valid authId is provided", async () => {
        const payload: AuthFindManyResourcesQueryPayload = { authId: "valid-auth-id" };
        const resources = [
            { id: 1, resourceName: "Resource 1" },
            { id: 2, resourceName: "Resource 2" }
        ] as unknown as AuthResourceModel[];

        repository.findManyAsync.mockResolvedValue(resources);

        const result = await query.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [{ field: 'authId', operator: 'eq', value: payload.authId }] });
        expect(result).toEqual(resources);
    });
});
