import { Branch } from "../branch.domain";
import { BranchExternalKeyConflictError } from "../errors/branch-external-key.errors";
import { AddBranchExternalKeyPayload } from "../payloads/branch.payloads";

describe('Branch Entity', () => {
    let branch: Branch;

    beforeEach(() => {
        branch = Branch.create({
            companyId: 'Company1',
            cityId: 123,
            name: 'Old Branch Name'
        });
    });

    it('should get the correct initial state', () => {
        expect(branch.companyId).toEqual('Company1');
        expect(branch.cityId).toEqual(123);
        expect(branch.name).toEqual('Old Branch Name');
    });

    it('should rename the branch', () => {
        branch.rename('New Branch Name');
        expect(branch.name).toEqual('New Branch Name');
        expect(branch.externalKeys).toHaveLength(0);
    });

    it('should rehydrate', () => {
        const branchId = crypto.randomUUID();
        const rehydrated = Branch.rehydrate({
            id: branchId,
            companyId: 'Company1',
            cityId: 123,
            name: 'Old Branch Name',
            externalKeys: []
        });

        expect(rehydrated.id).toEqual(branchId);
        expect(rehydrated.companyId).toEqual('Company1');
        expect(rehydrated.cityId).toEqual(123);
        expect(rehydrated.name).toEqual('Old Branch Name');
        expect(rehydrated.externalKeys).toHaveLength(0);
    });

    it('should add an external key property', () => {
        const payload: AddBranchExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        branch.addExternalKey(payload);

        expect(branch.externalKeys).toHaveLength(1);
        expect(branch.externalKeys[0].owner).toBe(payload.owner);
        expect(branch.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddBranchExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        branch.addExternalKey(payload);

        expect(() => branch.addExternalKey(payload)).toThrow(BranchExternalKeyConflictError);
    });
});
