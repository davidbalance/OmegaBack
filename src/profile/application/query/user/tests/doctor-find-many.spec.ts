/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { DoctorFindManyQuery, DoctorFindManyQueryImpl, DoctorFindManyQueryPayload } from "../doctor-find-many.query";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";

describe("DoctorFindManyQuery", () => {
    let repository: jest.Mocked<DoctorRepository>;
    let queryHandler: DoctorFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<DoctorRepository>;

        queryHandler = new DoctorFindManyQueryImpl(repository);
    });

    it("should apply filter and fetch doctors when filter is provided", async () => {
        const payload: DoctorFindManyQueryPayload = {
            filter: "test",
            skip: 1,
            limit: 10,
            order: { userName: "asc" },
        };

        const mockedDoctors = [{ id: "1", userName: "Test Doctor" }] as unknown as DoctorModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockedDoctors);
        repository.countAsync.mockResolvedValue(mockedCount);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{
                operator: "or", filter: [
                    { field: "userDni", operator: "like", value: "test" },
                    { field: "userEmail", operator: "like", value: "test" },
                    { field: "userName", operator: "like", value: "test" },
                    { field: "userLastname", operator: "like", value: "test" }
                ]
            }],
        });
        expect(repository.countAsync).toHaveBeenCalledWith([{
            operator: "or",
            filter: [
                { field: "userDni", operator: "like", value: "test" },
                { field: "userEmail", operator: "like", value: "test" },
                { field: "userName", operator: "like", value: "test" },
                { field: "userLastname", operator: "like", value: "test" }
            ]
        }]);
        expect(result).toEqual({ data: mockedDoctors, amount: mockedCount });
    });

    it("should return empty data and amount when no filter is provided", async () => {
        const payload: DoctorFindManyQueryPayload = {
            filter: undefined,
            skip: 1,
            limit: 10,
            order: { userName: "asc" },
        };

        const mockedDoctors = [{ id: "1", userName: "Test Doctor" }] as unknown as DoctorModel[];
        const mockedCount = 1;

        repository.findManyAsync.mockResolvedValue(mockedDoctors);
        repository.countAsync.mockResolvedValue(mockedCount);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ operator: "or", filter: [] }],
        });
        expect(result).toEqual({ data: mockedDoctors, amount: mockedCount });
    });

    it("should handle no results from findManyAsync", async () => {
        const payload: DoctorFindManyQueryPayload = {
            filter: undefined,
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
