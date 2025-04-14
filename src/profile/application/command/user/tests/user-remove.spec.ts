/* eslint-disable @typescript-eslint/unbound-method */
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { UserRemoveCommand, UserRemoveCommandPayload } from "../user-remove.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("UserRemoveCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserRemoveCommand(repository);
    });

    it("should remove the user and save changes", async () => {
        const mockUser = {
            id: "user-id",
            remove: jest.fn(),
        } as unknown as User;

        const payload: UserRemoveCommandPayload = {
            userId: "user-id",
        };

        repository.findOneAsync.mockResolvedValue(mockUser); // User exists

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(mockUser.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserNotFoundError if the user does not exist", async () => {
        const payload: UserRemoveCommandPayload = {
            userId: "user-id",
        };

        repository.findOneAsync.mockResolvedValue(null); // User does not exist

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
