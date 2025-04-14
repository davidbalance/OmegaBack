import { Logo } from "../logo.domain";

describe('Logo Entity', () => {
    let logo: Logo;

    beforeEach(() => {
        logo = Logo.create({
            name: 'Test Logo'
        });
    });

    it('should create a Logo instance with correct initial state', () => {
        expect(logo.name).toEqual('Test Logo');
    });

    it('should rehydrate a Logo entity with given properties', () => {
        const rehydrated = Logo.rehydrate({
            id: '5678',
            name: 'Rehydrated Logo'
        });

        expect(rehydrated.name).toEqual('Rehydrated Logo');
    });
});
