import { ApiKey } from "../api-key.domain";

describe('ApiKey Entity', () => {
    let apiKey: ApiKey;

    beforeEach(() => {
        apiKey = ApiKey.create({
            keyName: 'Test Key',
            authId: 'auth-123'
        });
    });

    it('should create an ApiKey instance with correct initial state', () => {
        expect(apiKey.keyName).toEqual('Test Key');
        expect(apiKey.authId).toEqual('auth-123');
        expect(apiKey.apikey).toBeDefined();
    });

    it('should rehydrate an ApiKey entity with given properties', () => {
        const rehydrated = ApiKey.rehydrate({
            id: 'api-5678',
            apikey: 'existing-api-key',
            keyName: 'Rehydrated Key',
            authId: 'auth-456'
        });

        expect(rehydrated.keyName).toEqual('Rehydrated Key');
        expect(rehydrated.authId).toEqual('auth-456');
        expect(rehydrated.apikey).toEqual('existing-api-key');
    });

    it('should validate the correct API key', () => {
        const valid = apiKey.validate(apiKey.apikey);
        expect(valid).toBeTruthy();
    });

    it('should not validate an incorrect API key', () => {
        const valid = apiKey.validate('wrong-key');
        expect(valid).toBeFalsy();
    });
});
