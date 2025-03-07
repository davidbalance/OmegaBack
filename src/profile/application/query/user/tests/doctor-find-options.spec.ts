/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorOptionModel } from "@omega/profile/core/model/user/doctor-option.model";
import { DoctorFindOptionsQuery } from "../doctor-find-options.query";
import { DoctorOptionRepository } from "@omega/profile/application/repository/model.repositories";

describe("DoctorFindOptionsQuery", () => {
    let repository: jest.Mocked<DoctorOptionRepository>;
    let handler: DoctorFindOptionsQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<DoctorOptionRepository>;

        handler = new DoctorFindOptionsQuery(repository);
    });

    it("should return a list of doctor options", async () => {
        const mockOptions: DoctorOptionModel[] = [
            { toDomain: jest.fn().mockReturnValue({ value: "option1", label: "Option 1" }) },
            { toDomain: jest.fn().mockReturnValue({ value: "option2", label: "Option 2" }) },
        ] as unknown as DoctorOptionModel[];

        repository.findManyAsync.mockResolvedValue(mockOptions);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
        ]);
        expect(mockOptions[0].toDomain).toHaveBeenCalled();
        expect(mockOptions[1].toDomain).toHaveBeenCalled();
    });

    it("should return an empty list when no doctor options are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
    });
});
