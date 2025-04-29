/* eslint-disable @typescript-eslint/unbound-method */
import { CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyFindManyQuery, CompanyFindManyQueryImpl, CompanyFindManyQueryPayload } from "../company-find-many.query";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";

describe("CompanyFindManyQuery", () => {
    let repository: jest.Mocked<CompanyRepository>;
    let queryHandler: CompanyFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyRepository>;

        queryHandler = new CompanyFindManyQueryImpl(repository);
    });

    it("should successfully fetch companies for a corporative with pagination and ordering", async () => {
        const payload: CompanyFindManyQueryPayload = {
            corporativeId: "corporative-1",
            skip: 0,
            limit: 10,
            order: { companyName: "asc" }
        };

        const companies: CompanyModel[] = [
            { id: "company-1", corporativeId: "corporative-1", companyName: "Company A", companyRuc: "RUC001" },
            { id: "company-2", corporativeId: "corporative-1", companyName: "Company B", companyRuc: "RUC002" },
        ] as unknown as CompanyModel[];

        repository.findManyAsync.mockResolvedValue(companies);
        repository.countAsync.mockResolvedValue(companies.length);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ field: 'corporativeId', operator: 'eq', value: payload.corporativeId }],
        });
        expect(result).toEqual({ data: companies, amount: companies.length });
    });

    it("should return an empty array if no companies are found for the corporative", async () => {
        const payload: CompanyFindManyQueryPayload = { corporativeId: "corporative-1", skip: 0, limit: 10, order: { companyName: "asc" } };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(payload);

        expect(result).toEqual({ data: [], amount: 0 });
    });

    it("should apply filter for companyName or companyRuc when filter is provided", async () => {
        const payload: CompanyFindManyQueryPayload = {
            corporativeId: "corporative-1",
            filter: "Company A",
            skip: 0,
            limit: 10,
            order: { companyName: "asc" }
        };

        const companies: CompanyModel[] = [
            { id: "company-1", corporativeId: "corporative-1", companyName: "Company A", companyRuc: "RUC001" }
        ] as unknown as CompanyModel[];

        repository.findManyAsync.mockResolvedValue(companies);
        repository.countAsync.mockResolvedValue(companies.length);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [
                { field: 'corporativeId', operator: 'eq', value: payload.corporativeId },
                {
                    operator: 'or',
                    filter: [
                        { field: 'companyName', operator: 'like', value: payload.filter },
                        { field: 'companyRuc', operator: 'like', value: payload.filter }
                    ]
                }
            ]
        });
        expect(result).toEqual({ data: companies, amount: companies.length });
    });

    it("should return all companies for a corporative when no filter is provided", async () => {
        const payload: CompanyFindManyQueryPayload = {
            corporativeId: "corporative-1",
            skip: 0,
            limit: 10,
            order: { companyName: "asc" }
        };

        const companies: CompanyModel[] = [
            { id: "company-1", corporativeId: "corporative-1", companyName: "Company A", companyRuc: "RUC001" },
            { id: "company-2", corporativeId: "corporative-1", companyName: "Company B", companyRuc: "RUC002" }
        ] as unknown as CompanyModel[];

        repository.findManyAsync.mockResolvedValue(companies);
        repository.countAsync.mockResolvedValue(companies.length);

        const result = await queryHandler.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ field: 'corporativeId', operator: 'eq', value: payload.corporativeId }],
        });
        expect(result).toEqual({ data: companies, amount: companies.length });
    });
});
