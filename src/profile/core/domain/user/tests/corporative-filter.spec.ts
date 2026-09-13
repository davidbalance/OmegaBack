import { CorporativeFilter } from "../corporative-filter.domain";

describe('Corporative Filter Entity', () => {
    let companyFilter: CorporativeFilter;

    it('should create a new Corporative Filter instance', () => {
        const value = CorporativeFilter.create({
            corporativeId: 'corporative1',
            corporativeName: 'Corporative 1',
            userId: 'User1'
        })
        expect(value.corporativeId).toEqual('corporative1');
        expect(value.corporativeName).toEqual('Corporative 1');
        expect(value.userId).toEqual('User1');
    });

    it('should rehydrate a Corporative Filter', () => {
        const companyFilterId = crypto.randomUUID();
        const rehydrated = CorporativeFilter.rehydrate({
            id: companyFilterId,
            corporativeId: 'corporative1',
            corporativeName: 'Corporative 1',
            userId: 'User1'
        });

        expect(rehydrated.id).toEqual(companyFilterId);
        expect(rehydrated.corporativeId).toEqual('corporative1');
        expect(rehydrated.corporativeName).toEqual('Corporative 1');
        expect(rehydrated.userId).toEqual('User1');
    });
});
