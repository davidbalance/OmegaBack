import { Branch } from "../branch.domain";

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
    });

    it('should rehydrate', () => {
        const branchId = crypto.randomUUID();
        const rehydrated = Branch.rehydrate({
            id: branchId,
            companyId: 'Company1',
            cityId: 123,
            name: 'Old Branch Name'
        });

        expect(rehydrated.id).toEqual(branchId);
        expect(rehydrated.companyId).toEqual('Company1');
        expect(rehydrated.cityId).toEqual(123);
        expect(rehydrated.name).toEqual('Old Branch Name');
    });
});
