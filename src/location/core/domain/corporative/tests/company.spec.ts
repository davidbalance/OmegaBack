import { Company } from "../company.domain";
import { BranchExternalKeyConflictError } from "../errors/branch-external-key.errors";
import { BranchConflictError, BranchNotFoundError } from "../errors/branch.errors";
import { CompanyExternalKeyConflictError } from "../errors/company-external-key.errors";
import { AddBranchExternalKeyFromCompanyPayload, AddCompanyExternalKeyPayload } from "../payloads/company.payloads";

describe('Company Entity', () => {
    let company: Company;
    const branchName = 'Branch A';

    beforeEach(() => {
        company = Company.create({
            corporativeId: 'Corp1',
            name: 'Company 1',
            ruc: '1234567890001',
            address: '123 Main St',
            phone: '123-456-7890'
        });
    });

    it('should get the correct initial state', () => {
        expect(company.corporativeId).toEqual('Corp1');
        expect(company.name).toEqual('Company 1');
        expect(company.ruc).toEqual('1234567890001');
        expect(company.address).toEqual('123 Main St');
        expect(company.phone).toEqual('123-456-7890');
        expect(company.externalKeys).toHaveLength(0);
    });

    it('should add a branch to the company', () => {
        company.addBranch({
            name: branchName,
            cityId: 1
        });
        expect(company.branches).toHaveLength(1);
        expect(company.branches[0].name).toEqual(branchName);
    });

    it('should throw error when adding a branch with a duplicate name', () => {
        company.addBranch({
            name: branchName,
            cityId: 1,
        });

        expect(() => {
            company.addBranch({
                name: branchName,
                cityId: 2,
            });
        }).toThrow(BranchConflictError);
    });

    it('should remove a branch from the company', () => {
        company.addBranch({
            name: branchName,
            cityId: 1,
        });

        const branchId = company.branches[0].id;

        company.removeBranch(branchId);
        expect(company.branches).toHaveLength(0);
    });

    it('should throw error when removing a non-existing branch', () => {
        expect(() => {
            company.removeBranch('non-existing-branch-id');
        }).toThrow(BranchNotFoundError);
    });

    it('should move a branch to another company', () => {
        company.addBranch({
            name: branchName,
            cityId: 1
        });

        const branchId = company.branches[0].id;

        const targetCompany = Company.create({
            corporativeId: 'Corp2',
            name: 'Company 2',
            ruc: '0987654321001',
            address: '456 Secondary St',
            phone: '987-654-3210'
        });

        company.moveBranchTo(targetCompany, branchId);

        expect(company.branches).toHaveLength(0);
        expect(targetCompany.branches).toHaveLength(1);
        expect(targetCompany.branches[0].name).toEqual(branchName);
    });

    it('should throw error when moving a non-existing branch', () => {
        const targetCompany = Company.create({
            corporativeId: 'Corp2',
            name: 'Company 2',
            ruc: '0987654321001',
            address: '456 Secondary St',
            phone: '987-654-3210'
        });

        expect(() => {
            company.moveBranchTo(targetCompany, 'non-existing-branch-id');
        }).toThrow(BranchNotFoundError);
    });

    it('should rehydrate company with branches', () => {
        const rehydrated = Company.rehydrate({
            id: company.id,
            corporativeId: 'Corp1',
            name: 'Company 1',
            ruc: '1234567890001',
            address: '123 Main St',
            phone: '123-456-7890',
            branches: [],
            externalKeys: []
        });

        expect(rehydrated.id).toEqual(company.id);
        expect(rehydrated.corporativeId).toEqual(company.corporativeId);
        expect(rehydrated.name).toEqual(company.name);
        expect(rehydrated.ruc).toEqual(company.ruc);
        expect(rehydrated.address).toEqual(company.address);
        expect(rehydrated.phone).toEqual(company.phone);
        expect(rehydrated.branches).toHaveLength(0);
        expect(rehydrated.externalKeys).toHaveLength(0);
    });

    it('should add an external key property', () => {
        const payload: AddCompanyExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        company.addExternalKey(payload);

        expect(company.externalKeys).toHaveLength(1);
        expect(company.externalKeys[0].owner).toBe(payload.owner);
        expect(company.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddCompanyExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        company.addExternalKey(payload);

        expect(() => company.addExternalKey(payload)).toThrow(CompanyExternalKeyConflictError);
    });

    it('should add an external key for branch', () => {
        company.addBranch({ name: branchName, cityId: 1 });
        const payload: AddCompanyExternalKeyPayload = { owner: 'omega', value: 'sample-key' };

        company.addExternalKey(payload);

        expect(company.externalKeys).toHaveLength(1);
        expect(company.externalKeys[0].owner).toBe(payload.owner);
        expect(company.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key exists on branch', () => {
        company.addBranch({ name: branchName, cityId: 1 });
        const value = [...company.branches].pop()!;

        const payload: AddBranchExternalKeyFromCompanyPayload = {
            owner: 'omega',
            value: 'sample-key',
            branchId: value.id
        };

        company.addExternalKeyToBranch(payload);

        expect(() => company.addExternalKeyToBranch(payload)).toThrow(BranchExternalKeyConflictError);
    });
});
