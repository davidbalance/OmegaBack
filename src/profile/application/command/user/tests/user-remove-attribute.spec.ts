/* eslint-disable @typescript-eslint/unbound-method */
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { UserRemoveAttributeCommand, UserRemoveAttributeCommandPayload } from "../user-remove-attribute.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("UserRemoveAttributeCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserRemoveAttributeCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserRemoveAttributeCommand(repository);
    });

    it("should remove an attribute from a user and save the user", async () => {
        const mockUser = {
            id: "user-id",
            removeAttribute: jest.fn(),
        } as unknown as User;

        const payload: UserRemoveAttributeCommandPayload = {
            userId: "user-id",
            attributeId: "attribute-id",
        };

        repository.findOneAsync.mockResolvedValue(mockUser);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(mockUser.removeAttribute).toHaveBeenCalledWith(payload.attributeId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserNotFoundError if the user does not exist", async () => {
        const payload: UserRemoveAttributeCommandPayload = {
            userId: "user-id",
            attributeId: "attribute-id",
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
