export interface ApiKeyProvider {
    validateApiKey(apiKey: string): Promise<string>;
}