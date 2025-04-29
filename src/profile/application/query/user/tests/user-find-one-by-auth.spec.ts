/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindOneByAuthQuery, UserFindOneByAuthQueryImpl, UserFindOneByAuthQueryPayload } from "../user-find-one-by-auth.query";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

describe("UserFindOneByAuthQuery", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserFindOneByAuthQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserFindOneByAuthQueryImpl(repository);
    });

    it("should return a user when found by userId", async () => {
        const mockUser: UserModel = {
            userId: 'user-valid-id',
            userName: 'Stub name',
            userLastname: 'Stub lastname',
            userDni: '000000000',
            authId: 'auth-valid-id',
        } as unknown as UserModel;

        const query: UserFindOneByAuthQueryPayload = { authId: "auth-valid-id" };

        repository.findOneAsync.mockResolvedValue(mockUser); // Simulate repository return

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "authId", operator: "eq", value: query.authId }]);
        expect(result).toEqual(mockUser);
    });

    it("should throw a UserNotFoundError when no doctor is found by userId", async () => {
        const query: UserFindOneByAuthQueryPayload = { authId: "user123" };

        repository.findOneAsync.mockResolvedValue(null); // Simulate no result

        await expect(handler.handleAsync(query)).rejects.toThrow(UserNotFoundError);
    });
});
