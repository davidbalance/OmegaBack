import { CompanyFilter } from "../company-filter.domain";

describe('Company Filter Entity', () => {
    let companyFilter: CompanyFilter;

    it('should create a new Company Filter instance', () => {
        const value = CompanyFilter.create({
            corporativeId: 'corporative1',
            corporativeName: 'Corporative 1',
            companyId: 'company1',
            companyRuc: 'RUC1',
            userId: 'User1'
        })
        expect(value.corporativeId).toEqual('corporative1');
        expect(value.corporativeName).toEqual('Corporative 1');
        expect(value.companyId).toEqual('company1');
        expect(value.companyRuc).toEqual('RUC1');
        expect(value.userId).toEqual('User1');
    });

    it('should rehydrate an attribute', () => {
        const companyFilterId = crypto.randomUUID();
        const rehydrated = CompanyFilter.rehydrate({
            id: companyFilterId,
            corporativeId: 'corporative1',
            corporativeName: 'Corporative 1',
            companyId: 'company1',
            companyRuc: 'RUC1',
            userId: 'User1'
        });

        expect(rehydrated.id).toEqual(companyFilterId);
        expect(rehydrated.corporativeId).toEqual('corporative1');
        expect(rehydrated.corporativeName).toEqual('Corporative 1');
        expect(rehydrated.companyId).toEqual('company1');
        expect(rehydrated.companyRuc).toEqual('RUC1');
        expect(rehydrated.userId).toEqual('User1');
    });
});
