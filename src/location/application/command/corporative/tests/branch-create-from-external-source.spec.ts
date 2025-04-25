/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { BranchExternalConnectionRepository, BranchRepository } from "@omega/location/application/repository/model.repositories";
import { BranchCreateFromExternalSourceCommand, BranchCreateFromExternalSourceCommandImpl, BranchCreateFromExternalSourceCommandPayload } from "../branch-create-from-external-source.command";
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";

describe("BranchCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<BranchExternalConnectionRepository>;
    let modelRepository: jest.Mocked<BranchRepository>;
    let agggregateRepository: jest.Mocked<CorporativeRepository>;
    let handler: BranchCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<BranchExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<BranchRepository>;

        agggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new BranchCreateFromExternalSourceCommandImpl(
            externalConnectionRepository,
            modelRepository,
            agggregateRepository
        );
    });

    it("should successfully add a branch to an existing corporative and assign an external key", async () => {
        const payload: BranchCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };
        const branchId = "branch-789";

        const mockCorporative = {
            addBranchToCompany: jest.fn(),
            addExternalKeyToBranch: jest.fn(),
            companies: [{ id: payload.companyId, branches: [{ id: branchId }] }]
        } as unknown as Corporative;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);
        agggregateRepository.findOneAsync.mockResolvedValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'branchExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyId', operator: 'eq', value: payload.companyId },
            { field: 'branchName', operator: 'eq', value: payload.name },
        ]);
        expect(mockCorporative.addBranchToCompany).toHaveBeenCalledWith(payload);
        expect(mockCorporative.addExternalKeyToBranch).toHaveBeenCalledWith({
            branchId: branchId,
            companyId: payload.companyId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockCorporative);
    });

    it("should successfully assign an external key to an existing branch without creating a new one", async () => {
        const payload: BranchCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };

        const mockBranch: BranchModel = { branchId: "existing-branch-456" } as unknown as BranchModel;
        const mockCorporative = {
            addExternalKeyToBranch: jest.fn(),
        } as unknown as Corporative;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockBranch);
        agggregateRepository.findOneAsync.mockResolvedValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'branchExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyId', operator: 'eq', value: payload.companyId },
            { field: 'branchName', operator: 'eq', value: payload.name },
        ]);
        expect(mockCorporative.addExternalKeyToBranch).toHaveBeenCalledWith({
            branchId: mockBranch.branchId,
            companyId: payload.companyId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockCorporative);
    });

    it("should throw BranchExternalKeyConflictError if the external key already exists", async () => {
        const mockExternalConnection: BranchExternalConnectionModel = {} as unknown as BranchExternalConnectionModel;
        const payload: BranchCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: "external-owner",
            externalKeyValue: "external-value",
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(BranchExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'branchExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw CorporativeNotFoundError if the corporative does not exist", async () => {
        const payload: BranchCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Branch",
            cityId: 78,
            companyId: "comp-123"
        };

        agggregateRepository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});