import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalConnectionRepository } from "../../repository/model.repositories";
import { CompanyExternalSourceResolver } from "../../resolver/company-external-source.resolver";
import { CorporativeExternalSourceResolver } from "../../resolver/corporative-external-source.resolver";
import { CreateCompanyFromExternalSourcePayload, CreateCompanyFromExternalSourceService } from "../create-company-from-external-source.service";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";

describe('CreateCompanyFromExternalSourceService', () => {
    let service: CreateCompanyFromExternalSourceService;
    let externalConnection: jest.Mocked<CompanyExternalConnectionRepository>;
    let corporativeResolver: jest.Mocked<CorporativeExternalSourceResolver>;
    let companyResolver: jest.Mocked<CompanyExternalSourceResolver>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyExternalConnectionRepository>;

        corporativeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalSourceResolver>;

        companyResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<CompanyExternalSourceResolver>;

        service = new CreateCompanyFromExternalSourceService(externalConnection, corporativeResolver, companyResolver);
    });

    it('should return an existing company if it is already present in the repository', async () => {
        const mockExam: CompanyExternalConnectionModel = {
            companyId: 'company-id',
            companyExternalKey: 'external-value',
            companyExternalOwner: 'external-owner'
        } as unknown as CompanyExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: CreateCompanyFromExternalSourcePayload = {
            owner: 'external-value',
            corporativeKey: "corporative-key",
            companyKey: "company-key",
            corporativeName: "coporative name",
            companyName: "Company Name",
            companyPhone: "0999999999",
            companyRuc: "0123456789001",
            companyAddress: "Company Address",
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalKey', operator: 'eq', value: payload.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(corporativeResolver.resolve).not.toHaveBeenCalled();
        expect(companyResolver.resolve).not.toHaveBeenCalled();
        expect(companyResolver.resolve).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should resolve corporative and company when company is not found in the repository', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedCorporative: CorporativeExternalConnectionModel = { corporativeId: '1' } as unknown as CorporativeExternalConnectionModel;
        const resolvedCompany: CompanyExternalConnectionModel = { companyId: 'A' } as unknown as CompanyExternalConnectionModel;

        corporativeResolver.resolve.mockResolvedValue(resolvedCorporative);
        companyResolver.resolve.mockResolvedValue(resolvedCompany);
        companyResolver.resolve.mockResolvedValue(resolvedCompany);

        const payload: CreateCompanyFromExternalSourcePayload = {
            owner: 'external-value',
            corporativeKey: "corporative-key",
            companyKey: "company-key",
            corporativeName: "coporative name",
            companyName: "Company Name",
            companyPhone: "0999999999",
            companyRuc: "0123456789001",
            companyAddress: "Company Address",
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalKey', operator: 'eq', value: payload.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(corporativeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(companyResolver.resolve).toHaveBeenCalledWith({ ...payload, corporativeId: resolvedCorporative.corporativeId });
        expect(result).toEqual(resolvedCompany);
    });
});
