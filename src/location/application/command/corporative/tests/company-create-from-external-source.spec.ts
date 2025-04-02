/* eslint-disable @typescript-eslint/unbound-method */
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { CompanyExternalConnectionRepository, CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyCreateFromExternalSourceCommand, CompanyCreateFromExternalSourceCommandPayload } from "../company-create-from-external-source.command";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";

describe("CompanyCreateFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<CompanyExternalConnectionRepository>;
    let modelRepository: jest.Mocked<CompanyRepository>;
    let agggregateRepository: jest.Mocked<CorporativeRepository>;
    let handler: CompanyCreateFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<CompanyExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<CompanyRepository>;

        agggregateRepository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<CorporativeRepository>;

        handler = new CompanyCreateFromExternalSourceCommand(
            externalConnectionRepository,
            modelRepository,
            agggregateRepository
        );
    });

    it("Should successfully adding a new company and assigning an external key", async () => {
        const payload: CompanyCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };
        const companyId = "branch-789";

        const mockCorporative = {
            addCompany: jest.fn(),
            addExternalKeyToCompany: jest.fn(),
            companies: [{ id: companyId }]
        } as unknown as Corporative;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);
        agggregateRepository.findOneAsync.mockResolvedValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'companyExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeId', operator: 'eq', value: payload.corporativeId },
            { field: 'companyName', operator: 'eq', value: payload.name },
        ]);
        expect(mockCorporative.addCompany).toHaveBeenCalledWith(payload);
        expect(mockCorporative.addExternalKeyToCompany).toHaveBeenCalledWith({
            companyId: companyId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockCorporative);
    });

    it("Should successfully assign an external key to an existing company", async () => {
        const payload: CompanyCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };

        const mockCompany: CompanyModel = { companyId: "existing-branch-456" } as unknown as CompanyModel;
        const mockCorporative = {
            addExternalKeyToCompany: jest.fn(),
        } as unknown as Corporative;

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(mockCompany);
        agggregateRepository.findOneAsync.mockResolvedValue(mockCorporative);

        await handler.handleAsync(payload);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'companyExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeId', operator: 'eq', value: payload.corporativeId },
            { field: 'companyName', operator: 'eq', value: payload.name },
        ]);
        expect(mockCorporative.addExternalKeyToCompany).toHaveBeenCalledWith({
            companyId: mockCompany.companyId,
            owner: payload.externalKeyOwner,
            value: payload.externalKeyValue
        });
        expect(agggregateRepository.saveAsync).toHaveBeenCalledWith(mockCorporative);
    });

    it("should throw CompanyExternalKeyConflictError if the external key already exists", async () => {
        const mockExternalConnection: CompanyExternalConnectionModel = {} as unknown as CompanyExternalConnectionModel;
        const payload: CompanyCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CompanyExternalKeyConflictError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalOwner', operator: 'eq', value: payload.externalKeyOwner },
            { field: 'companyExternalKey', operator: 'eq', value: payload.externalKeyValue },
        ]);
        expect(agggregateRepository.findOneAsync).not.toHaveBeenCalled();
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw CorporativeNotFoundError if the corporative does not exist", async () => {
        const payload: CompanyCreateFromExternalSourceCommandPayload = {
            externalKeyOwner: 'external-owner',
            externalKeyValue: 'external-value',
            corporativeId: "corp-123",
            name: "New Company",
            address: "Test address",
            phone: "0999999999",
            ruc: "0000000000001"
        };

        agggregateRepository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(CorporativeNotFoundError);

        expect(agggregateRepository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.corporativeId }] });
        expect(agggregateRepository.saveAsync).not.toHaveBeenCalled();
    });
});