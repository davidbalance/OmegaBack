import { CreateBranchFromExternalSourcePayload, CreateBranchFromExternalSourceService } from "../create-branch-from-external-source.service";
import { BranchExternalConnectionRepository } from "../../repository/model.repositories";
import { CorporativeExternalSourceResolver } from "../../resolver/corporative-external-source.resolver";
import { CompanyExternalSourceResolver } from "../../resolver/company-external-source.resolver";
import { BranchExternalSourceResolver } from "../../resolver/branch-external-source.resolver";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";

describe('CreateBranchFromExternalSourceService', () => {
    let service: CreateBranchFromExternalSourceService;
    let externalConnection: jest.Mocked<BranchExternalConnectionRepository>;
    let corporativeResolver: jest.Mocked<CorporativeExternalSourceResolver>;
    let companyResolver: jest.Mocked<CompanyExternalSourceResolver>;
    let branchResolver: jest.Mocked<BranchExternalSourceResolver>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchExternalConnectionRepository>;

        corporativeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalSourceResolver>;

        companyResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<CompanyExternalSourceResolver>;

        branchResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<BranchExternalSourceResolver>;

        service = new CreateBranchFromExternalSourceService(externalConnection, corporativeResolver, companyResolver, branchResolver);
    });

    it('should return an existing branch if it is already present in the repository', async () => {
        const mockExam: BranchExternalConnectionModel = {
            branchId: 'branch-id',
            branchExternalKey: 'external-value',
            branchExternalOwner: 'external-owner'
        } as unknown as BranchExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: CreateBranchFromExternalSourcePayload = {
            owner: 'external-value',
            corporativeKey: "corporative-key",
            companyKey: "company-key",
            branchKey: 'branch-key',
            cityId: 78,
            corporativeId: "corporative-id",
            corporativeName: "coporative name",
            companyId: "company-id",
            companyName: "Company Name",
            companyPhone: "0999999999",
            companyRuc: "0123456789001",
            companyAddress: "Company Address",
            branchName: 'branch name',
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalKey', operator: 'eq', value: payload.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(corporativeResolver.resolve).not.toHaveBeenCalled();
        expect(companyResolver.resolve).not.toHaveBeenCalled();
        expect(branchResolver.resolve).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should resolve corporative, company, and branch when branch is not found in the repository', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedType: CorporativeExternalConnectionModel = { corporativeId: '1' } as unknown as CorporativeExternalConnectionModel;
        const resolvedSubcorporative: CompanyExternalConnectionModel = { companyId: 'A' } as unknown as CompanyExternalConnectionModel;
        const resolvedExam: BranchExternalConnectionModel = { id: '456' } as unknown as BranchExternalConnectionModel;

        corporativeResolver.resolve.mockResolvedValue(resolvedType);
        companyResolver.resolve.mockResolvedValue(resolvedSubcorporative);
        branchResolver.resolve.mockResolvedValue(resolvedExam);

        const payload: CreateBranchFromExternalSourcePayload = {
            owner: 'external-value',
            corporativeKey: "corporative-key",
            companyKey: "company-key",
            branchKey: 'branch-key',
            cityId: 78,
            corporativeId: "corporative-id",
            corporativeName: "coporative name",
            companyId: "company-id",
            companyName: "Company Name",
            companyPhone: "0999999999",
            companyRuc: "0123456789001",
            companyAddress: "Company Address",
            branchName: 'branch name',
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalKey', operator: 'eq', value: payload.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(corporativeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(companyResolver.resolve).toHaveBeenCalledWith({ ...payload, corporativeId: resolvedType.corporativeId });
        expect(branchResolver.resolve).toHaveBeenCalledWith({ ...payload, corporativeId: resolvedType.corporativeId, companyId: resolvedSubcorporative.companyId });
        expect(result).toEqual(resolvedExam);
    });
});
