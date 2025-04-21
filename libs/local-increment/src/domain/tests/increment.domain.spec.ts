import { IncrementDomain } from "../increment.domain";

describe('Increment Aggregate', () => {
    let domain: IncrementDomain;

    beforeEach(() => {
        domain = IncrementDomain.create('test');
    });

    it('should get the correct initial state', () => {
        expect(domain.key).toEqual('test');
        expect(domain.count).toEqual(0);
    });

    it('should rehydrate a domain', () => {
        const domainId = crypto.randomUUID();
        const rehydrated = IncrementDomain.rehydrate({
            id: domainId,
            key: 'test',
            count: 10
        });

        expect(rehydrated.id).toEqual(domainId);
        expect(rehydrated.key).toEqual('test');
        expect(rehydrated.count).toEqual(10);
    });

    describe('next', () => {
        it('should increment the count by 1 and return the new value', () => {
            const newVal = domain.next();
            expect(newVal).toBe(1);
        });

        it('should update internal count state', () => {
            domain.next();
            expect(domain.count).toBe(1);
        });
    });

});
