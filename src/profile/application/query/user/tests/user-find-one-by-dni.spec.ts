/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { UserFindOneByDniQuery, UserFindOneByDniQueryImpl, UserFindOneByDniQueryPayload } from "../user-find-one-by-dni.query";

describe("UserFindOneByDniQuery", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserFindOneByDniQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserFindOneByDniQueryImpl(repository);
    });

    it("should return a user when found by dni", async () => {
        const mockUser: UserModel = {
            userId: 'user-valid-id',
            userName: 'Stub name',
            userLastname: 'Stub lastname',
            userDni: '000000000',
        } as unknown as UserModel;

        const query: UserFindOneByDniQueryPayload = { userDni: mockUser.userDni };

        repository.findOneAsync.mockResolvedValue(mockUser);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "userDni", operator: "eq", value: query.userDni }]);
        expect(result).toEqual(mockUser);
    });

    it("should throw a UserNotFoundError user is not found", async () => {
        const query: UserFindOneByDniQueryPayload = { userDni: "1234567890" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(UserNotFoundError);
    });
});
