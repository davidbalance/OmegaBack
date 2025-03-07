/* eslint-disable @typescript-eslint/unbound-method */
import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { UserAttributeFindOneQuery } from "../user-attribute-find-one.query";
import { UserAttributeRepository } from "@omega/profile/application/repository/model.repositories";
import { AttributeNotFoundError } from "@omega/profile/core/domain/user/errors/attribute.errors";

describe("UserAttributeFindOneQuery", () => {
    let repository: jest.Mocked<UserAttributeRepository>;
    let handler: UserAttributeFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserAttributeRepository>;

        handler = new UserAttributeFindOneQuery(repository);
    });

    it("should return the user attribute when found", async () => {
        const mockAttribute: UserAttributeModel = {
            userId: "user1",
            attributeName: "someAttribute",
            value: "someValue",
        } as unknown as UserAttributeModel;

        repository.findOneAsync.mockResolvedValue(mockAttribute);

        const result = await handler.handleAsync({
            userId: "user1",
            attributeName: "someAttribute",
        });

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'userId', operator: 'eq', value: "user1" },
            { field: 'attributeName', operator: 'eq', value: "someAttribute" },
        ]);
        expect(result).toEqual(mockAttribute);
    });

    it("should throw an error if the user or attribute is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync({
            userId: "user1",
            attributeName: "someAttribute",
        })).rejects.toThrow(AttributeNotFoundError);
    });
});
