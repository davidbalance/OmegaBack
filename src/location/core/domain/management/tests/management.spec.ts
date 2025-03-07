import { Management } from "../management.domain";

describe('Management Entity', () => {
    let management: Management;

    beforeEach(() => {
        management = Management.create({ name: 'HR Department' });
    });

    it('should get the correct initial state', () => {
        expect(management.name).toEqual('HR Department');
    });

    it('should rename the management', () => {
        management.rename('Finance Department');
        expect(management.name).toEqual('Finance Department');
    });

    it('should rehydrate', () => {
        const managementId = crypto.randomUUID();
        const rehydrated = Management.rehydrate({
            id: managementId,
            name: 'HR Department',
        });

        expect(rehydrated.id).toEqual(managementId);
        expect(rehydrated.name).toEqual('HR Department');
    });
});
