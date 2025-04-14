/* eslint-disable @typescript-eslint/unbound-method */
import { CompanyOptionModel } from "@omega/location/core/models/corporative/company-option.model";
import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeFindOptionsQuery } from "../corporative-find-options.query";
import { CompanyOptionRepository, CorporativeOptionRepository } from "@omega/location/application/repository/model.repositories";

describe("CorporativeFindOptionsQuery", () => {
    let companyRepository: jest.Mocked<CompanyOptionRepository>;
    let corporativeRepository: jest.Mocked<CorporativeOptionRepository>;
    let handler: CorporativeFindOptionsQuery;

    beforeEach(() => {
        companyRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyOptionRepository>;

        corporativeRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeOptionRepository>;

        handler = new CorporativeFindOptionsQuery(companyRepository, corporativeRepository);
    });

    it("should return combined company and corporative options", async () => {
        const mockCompanyOptions: CompanyOptionModel[] = [
            { companyValue: "company1", companyLabel: "Company 1", branchValue: "branch1", branchLabel: "Branch 1" },
            { companyValue: "company1", companyLabel: "Company 1", branchValue: "branch2", branchLabel: "Branch 2" },
        ] as unknown as CompanyOptionModel[];

        const mockCorporativeOptions = [
            { corporativeValue: "corporative1", corporativeLabel: "Corporative 1", companyValue: "company1" },
            { corporativeValue: "corporative2", corporativeLabel: "Corporative 2", companyValue: "company2" },
        ] as unknown as CorporativeOptionModel[];

        companyRepository.findManyAsync.mockResolvedValue(mockCompanyOptions);
        corporativeRepository.findManyAsync.mockResolvedValue(mockCorporativeOptions);

        const result = await handler.handleAsync();

        expect(companyRepository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(corporativeRepository.findManyAsync).toHaveBeenCalledWith({ filter: [] });

        expect(result).toEqual([
            {
                value: "corporative1",
                label: "Corporative 1",
                children: [
                    {
                        value: "company1",
                        label: "Company 1",
                        children: [
                            { value: "branch1", label: "Branch 1" },
                            { value: "branch2", label: "Branch 2" },
                        ]
                    }
                ]
            },
            {
                value: "corporative2",
                label: "Corporative 2",
                children: []
            }
        ]);
    });

    it("should return corporative options when no company options are found", async () => {
        const mockCompanyOptions: CompanyOptionModel[] = []; // Empty company options
        const mockCorporativeOptions = [
            { corporativeValue: "corporative1", corporativeLabel: "Corporative 1", companyValue: "company1" },
            { corporativeValue: "corporative2", corporativeLabel: "Corporative 2", companyValue: "company2" },
        ] as unknown as CorporativeOptionModel[];

        companyRepository.findManyAsync.mockResolvedValue(mockCompanyOptions);
        corporativeRepository.findManyAsync.mockResolvedValue(mockCorporativeOptions);

        const result = await handler.handleAsync();

        expect(result).toEqual([
            {
                value: "corporative1",
                label: "Corporative 1",
                children: []
            },
            {
                value: "corporative2",
                label: "Corporative 2",
                children: []
            }
        ]);
    });

    it("should return empty array when no corporative options are found", async () => {
        const mockCompanyOptions = [
            { companyValue: "company1", companyLabel: "Company 1", branchValue: "branch1", branchLabel: "Branch 1" },
            { companyValue: "company1", companyLabel: "Company 1", branchValue: "branch2", branchLabel: "Branch 2" },
        ] as unknown as CompanyOptionModel[];
        const mockCorporativeOptions: CorporativeOptionModel[] = []; // Empty corporative options

        companyRepository.findManyAsync.mockResolvedValue(mockCompanyOptions);
        corporativeRepository.findManyAsync.mockResolvedValue(mockCorporativeOptions);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
    });

    it("should return empty array when both repositories return no data", async () => {
        companyRepository.findManyAsync.mockResolvedValue([]);
        corporativeRepository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
    });
});
