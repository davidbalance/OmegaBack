/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementOptionModel } from "@omega/location/core/models/management/management-option.model";
import { ManagementFindOptionsQuery, ManagementFindOptionsQueryImpl } from "../management-find-options.query";
import { ManagementOptionRepository } from "@omega/location/application/repository/model.repositories";

describe("ManagementFindOptionsQuery", () => {
    let repository: jest.Mocked<ManagementOptionRepository>;
    let handler: ManagementFindOptionsQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementOptionRepository>;

        handler = new ManagementFindOptionsQueryImpl(repository);
    });

    it("should return management options when data exists", async () => {
        const mockManagementOptions: ManagementOptionModel[] = [
            { managementValue: "manager1", managementLabel: "Manager 1" },
            { managementValue: "manager2", managementLabel: "Manager 2" },
        ] as unknown as ManagementOptionModel[];

        // Assuming that `toOption` transforms the data into the `Option` format
        mockManagementOptions.forEach((option) => {
            option.toOption = jest.fn(() => ({
                value: option.managementValue,
                label: option.managementLabel,
            }));
        });

        repository.findManyAsync.mockResolvedValue(mockManagementOptions);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([
            { value: "manager1", label: "Manager 1" },
            { value: "manager2", label: "Manager 2" },
        ]);
    });

    it("should return an empty array when no management options are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
    });
});
