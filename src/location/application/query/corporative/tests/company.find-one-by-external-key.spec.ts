import { CompanyExternalConnectionRepository, CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyFindOneByExternalKeyQuery, CompanyFindOneByExternalKeyQueryImpl, CompanyFindOneByExternalKeyQueryPayload } from "../company.find-one-by-external-key.query";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyNotFoundError } from "@omega/location/core/domain/corporative/errors/company.errors";
import { CompanyExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";

describe("CompanyFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<CompanyExternalConnectionRepository>;
    let modelRepository: jest.Mocked<CompanyRepository>;
    let handler: CompanyFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyRepository>;

        handler = new CompanyFindOneByExternalKeyQueryImpl(externalConnectionRepository, modelRepository);
    });

    it("Should return an company model when the company exists", async () => {
        const mockExternalConnection = { companyId: "company123" } as unknown as CompanyExternalConnectionModel;
        const mockCompany = { companyId: "company123" } as unknown as CompanyModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockCompany);

        const query: CompanyFindOneByExternalKeyQueryPayload = {
            owner: "company-owner",
            value: "company-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: query.owner },
            { field: 'companyExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyId', operator: 'eq', value: mockExternalConnection.companyId }
        ]);
        expect(result).toEqual(mockCompany);
    });

    it("Should throw CompanyExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: CompanyFindOneByExternalKeyQueryPayload = {
            owner: "company-owner",
            value: "company-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(CompanyExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: query.owner },
            { field: 'companyExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw CompanyNotFoundError when the external key exists but the company does not", async () => {
        const mockExternalConnection = { companyId: "company123" } as unknown as CompanyExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: CompanyFindOneByExternalKeyQueryPayload = {
            owner: "company-owner",
            value: "company-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(CompanyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: query.owner },
            { field: 'companyExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyId', operator: 'eq', value: mockExternalConnection.companyId }
        ]);
    });
});
