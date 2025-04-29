import { Auth } from "../auth.domain";
import { ApiKeyConflictError, ApiKeyInvalidError, ApiKeyNotFoundError } from "../errors/api-key.errors";
import { } from "../errors/auth.errors";
import { AuthResourceConflictError, AuthResourceNotFoundError } from "../errors/auth-resource.errors";
import { TokenNotFoundError } from "../errors/token.errors";

describe('Auth Entity', () => {
    let auth: Auth;

    beforeEach(() => {
        auth = Auth.create({
            email: 'test@example.com',
            name: 'John',
            lastname: 'Doe',
            password: 'securepassword'
        });
    });

    it('should create an Auth instance with correct initial state', () => {
        expect(auth.email).toEqual('test@example.com');
        expect(auth.name).toEqual('John');
        expect(auth.lastname).toEqual('Doe');
        expect(auth.password).toEqual('securepassword');
        expect(auth.logo).toBeNull();
        expect(auth.apikeys).toEqual([]);
        expect(auth.token).toBeNull();
    });

    it('should rehydrate an Auth entity with given properties', () => {
        const rehydrated = Auth.rehydrate({
            id: 'auth-123',
            email: 'rehydrated@example.com',
            name: 'Jane',
            lastname: 'Smith',
            password: 'rehydratedpassword',
            apikeys: [],
            token: null,
            resources: ['resources-1'],
            logo: 'rehydrated-logo.png'
        });

        expect(rehydrated.email).toEqual('rehydrated@example.com');
        expect(rehydrated.name).toEqual('Jane');
        expect(rehydrated.lastname).toEqual('Smith');
        expect(rehydrated.password).toEqual('rehydratedpassword');
        expect(rehydrated.logo).toEqual('rehydrated-logo.png');
        expect(rehydrated.apikeys).toEqual([]);
        expect(rehydrated.token).toBeNull();
        expect(rehydrated.resources).toHaveLength(1);
    });

    it('should upadte password', () => {
        const password = "new-password";
        auth.updatePassword(password);
        expect(auth.password).toEqual(password);
    });

    it('should add an API key', () => {
        const apiKey = auth.addApiKey('Test API Key');
        expect(auth.apikeys.length).toBe(1);
        expect(auth.apikeys[0].keyName).toEqual('Test API Key');
        expect(apiKey).toBeDefined();
    });

    it('should throw an error when adding a duplicate API key name', () => {
        auth.addApiKey('Duplicate API Key');
        expect(() => auth.addApiKey('Duplicate API Key')).toThrow(ApiKeyConflictError);
    });

    it('should validate an existing API key', () => {
        const apiKey = auth.addApiKey('Valid API Key');
        expect(() => auth.validateApiKey(apiKey)).not.toThrow();
    });

    it('should throw an error when validating a non-existent API key', () => {
        expect(() => auth.validateApiKey('non-existent-key')).toThrow(ApiKeyInvalidError);
    });

    it('should remove an API key', () => {
        auth.addApiKey('removable-key')
        const apiKeyId = auth.apikeys[0].id;
        auth.removeApiKey(apiKeyId);
        expect(auth.apikeys.length).toBe(0);
    });

    it('should throw an error when removing a non-existent API key', () => {
        expect(() => auth.removeApiKey('non-existent-id')).toThrow(ApiKeyNotFoundError);
    });

    it('should add a token', () => {
        auth.addToken('test-token');
        expect(auth.token?.token).toEqual('test-token');
    });

    it('should refresh a token', () => {
        auth.addToken('old-token');
        auth.refreshToken('new-token');
        expect(auth.token?.token).toEqual('new-token');
    });

    it('should throw an error when refreshing a token if none exists', () => {
        expect(() => auth.refreshToken('new-token')).toThrow(TokenNotFoundError);
    });

    it('should remove a token', () => {
        auth.addToken('removable-token');
        auth.removeToken('removable-token');
        expect(auth.token).toBeNull();
    });

    it('should throw an error when removing a non-existent token', () => {
        expect(() => auth.removeToken('non-existent-token')).toThrow(TokenNotFoundError);
    });

    it('should add resources', () => {
        auth.addResource('resources-1');
        expect(auth.resources).toContain('resources-1');
    });

    it('should throw an error when adding duplicate resources', () => {
        auth.addResource('duplicate-resources');
        expect(() => auth.addResource('duplicate-resources')).toThrow(AuthResourceConflictError);
    });

    it('should remove resources', () => {
        auth.addResource('removable-resources');
        auth.removeResource('removable-resources');
        expect(auth.resources).not.toContain('removable-resources');
    });

    it('should throw an error when removing non-existent resources', () => {
        expect(() => auth.removeResource('non-existent-resources')).toThrow(AuthResourceNotFoundError);
    });

    it('should change the logo', () => {
        auth.addLogo('new-logo.png');
        expect(auth.logo).toEqual('new-logo.png');
    });
});
