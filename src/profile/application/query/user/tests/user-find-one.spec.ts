/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { UserFindOneQuery, UserFindOneQueryPayload } from "../user-find-one.query";

describe("UserFindOneQuery", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserFindOneQuery(repository);
    });

    it("should return a user when found by userId", async () => {
        const mockUser: UserModel = {
            userId: 'user-valid-id',
            userName: 'Stub name',
            userLastname: 'Stub lastname',
            userDni: '000000000',
        } as unknown as UserModel;

        const query: UserFindOneQueryPayload = { userId: "user-valid-id" };

        repository.findOneAsync.mockResolvedValue(mockUser);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "userId", operator: "eq", value: query.userId }]);
        expect(result).toEqual(mockUser);
    });

    it("should throw a UserNotFoundError user is found", async () => {
        const query: UserFindOneQueryPayload = { userId: "user123" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(UserNotFoundError);
    });
});
