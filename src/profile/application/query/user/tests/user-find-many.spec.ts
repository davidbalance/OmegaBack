/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindManyQuery, UserFindManyQueryPayload } from "../user-find-many.query";
import { UserModel } from "@omega/profile/core/model/user/user.model";

describe("UserFindManyQuery", () => {
    let repository: jest.Mocked<UserRepository>;
    let queryHandler: UserFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        queryHandler = new UserFindManyQuery(repository);
    });

    it("should apply filter and fetch users when filter is provided", async () => {
        const payload: UserFindManyQueryPayload = {
            filter: "test",
            skip: 1,
            limit: 10,
            order: { userName: "asc" },
        };

        const mockedUsers = [{ id: "1", userName: "Test User" }] as unknown as UserModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockedUsers);
        repository.countAsync.mockResolvedValue(mockedCount);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{
                operator: "or",
                filter: [
                    { field: "userDni", operator: "like", value: "test" },
                    { field: "userName", operator: "like", value: "test" },
                    { field: "userLastname", operator: "like", value: "test" }
                ]
            }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([{
            operator: "or",
            filter: [
                { field: "userDni", operator: "like", value: "test" },
                { field: "userName", operator: "like", value: "test" },
                { field: "userLastname", operator: "like", value: "test" }
            ]
        }]);
        expect(result).toEqual({ data: mockedUsers, amount: mockedCount });
    });

    it("should return empty data and amount when no filter is provided", async () => {
        const payload: UserFindManyQueryPayload = {
            filter: undefined,
            skip: 1,
            limit: 10,
            order: { userName: "asc" },
        };

        const mockedUsers = [{ id: "1", userName: "Test User" }] as unknown as UserModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockedUsers);
        repository.countAsync.mockResolvedValue(mockedCount);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ operator: "or", filter: [] }],
        });
        expect(result).toEqual({ data: mockedUsers, amount: mockedCount });
    });

    it("should handle no results from findManyAsync", async () => {
        const payload: UserFindManyQueryPayload = {
            filter: "test",
            skip: 1,
            limit: 10,
            order: { userName: "asc" },
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(payload);

        expect(result).toEqual({ data: [], amount: 0 });
    });
});
