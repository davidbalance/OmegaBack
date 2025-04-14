import { Resource } from "../resource.domain";

describe('Resource Entity', () => {
    let resource: Resource;

    beforeEach(() => {
        resource = Resource.create({
            order: 1,
            label: 'Test Resource',
            address: 'https://example.com',
            icon: 'icon.png'
        });
    });

    it('should create an Resource instance with correct initial state', () => {
        expect(resource.order).toEqual(1);
        expect(resource.label).toEqual('Test Resource');
        expect(resource.address).toEqual('https://example.com');
        expect(resource.icon).toEqual('icon.png');
        expect(resource.hidden).toBeFalsy();
    });

    it('should rehydrate an Resource entity with given properties', () => {
        const rehydrated = Resource.rehydrate({
            id: '1234',
            order: 1,
            label: 'Rehydrated Resource',
            address: 'https://rehydrated.com',
            icon: 'rehydrated.png',
            hidden: true
        });

        expect(rehydrated.order).toEqual(1);
        expect(rehydrated.label).toEqual('Rehydrated Resource');
        expect(rehydrated.address).toEqual('https://rehydrated.com');
        expect(rehydrated.icon).toEqual('rehydrated.png');
        expect(rehydrated.hidden).toBeTruthy();
    });

    it('should edit Resource properties', () => {
        resource.edit({
            label: 'Updated Resource',
            address: 'https://updated.com',
            icon: 'updated.png'
        });

        expect(resource.label).toEqual('Updated Resource');
        expect(resource.address).toEqual('https://updated.com');
        expect(resource.icon).toEqual('updated.png');
    });
});
