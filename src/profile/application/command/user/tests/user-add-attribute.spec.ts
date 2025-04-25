/* eslint-disable @typescript-eslint/unbound-method */
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { UserAddAttributeCommand, UserAddAttributeCommandImpl, UserAddAttributeCommandPayload } from "../user-add-attribute.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("UserAddAttributeCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: UserAddAttributeCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new UserAddAttributeCommandImpl(repository);
    });

    it("should add an attribute to the user when the user exists", async () => {
        const mockUser = {
            addAttribute: jest.fn(),
        } as unknown as User;

        const payload: UserAddAttributeCommandPayload = {
            userId: "user-123",
            attributeName: "exampleAttribute",
            attributeValue: "value",
        };

        repository.findOneAsync.mockResolvedValue(mockUser); // User exists

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(mockUser.addAttribute).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserNotFoundError when the user does not exist", async () => {
        const payload: UserAddAttributeCommandPayload = {
            userId: "user-123",
            attributeName: "exampleAttribute",
            attributeValue: "value",
        };

        repository.findOneAsync.mockResolvedValue(null); // User not found

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
