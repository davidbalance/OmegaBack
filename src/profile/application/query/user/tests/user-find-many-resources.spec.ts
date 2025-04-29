/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { AuthProvider, AuthResource } from "@shared/shared/providers/auth.provider";
import { UserFindManyResourcesQuery, UserFindManyResourcesQueryImpl, UserFindManyResourcesQueryPayload } from "../user-find-many-resources.query";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

describe("UserFindManyResourcesQuery", () => {
    let repository: jest.Mocked<UserRepository>;
    let authProvider: jest.Mocked<AuthProvider>;
    let queryHandler: UserFindManyResourcesQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        authProvider = {
            retriveResources: jest.fn(),
        } as unknown as jest.Mocked<AuthProvider>;

        queryHandler = new UserFindManyResourcesQueryImpl(repository, authProvider);
    });

    it("should retrieve resources when user is found", async () => {
        const payload: UserFindManyResourcesQueryPayload = { userId: "user123" };
        const mockedUser = { userId: "user123", authId: "authId" } as unknown as UserModel;
        const resources = [{ resourceLabel: "resource1" }, { resourceLabel: "resource2" }] as unknown as AuthResource[];

        repository.findOneAsync.mockResolvedValue(mockedUser);
        authProvider.retriveResources.mockResolvedValue(resources);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'userId', operator: 'eq', value: payload.userId }]);
        expect(authProvider.retriveResources).toHaveBeenCalledWith("authId");
        expect(result).toEqual(resources);
    });

    it("should throw UserNotFoundError when user is not found", async () => {
        const payload: UserFindManyResourcesQueryPayload = { userId: "nonExistentUser" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'userId', operator: 'eq', value: payload.userId }]);
        expect(authProvider.retriveResources).not.toHaveBeenCalled();
    });
});
