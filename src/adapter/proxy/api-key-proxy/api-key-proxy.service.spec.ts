import { ApiKeyFindOneByValueQuery } from "@omega/auth/application/query/auth/api-key-find-by-value.query";
import { ApiKeyProxyService } from "./api-key-proxy.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ApiKeyFindOneByValueQueryToken } from "@omega/auth/nest/inject/query.inject";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api-key-value.model";

describe("ApiKeyProxyService", () => {
    let service: ApiKeyProxyService;
    let apiKeyQuery: jest.Mocked<ApiKeyFindOneByValueQuery>;

    beforeEach(async () => {
        apiKeyQuery = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<ApiKeyFindOneByValueQuery>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ApiKeyProxyService,
                { provide: ApiKeyFindOneByValueQueryToken, useValue: apiKeyQuery }
            ]
        }).compile();

        service = module.get<ApiKeyProxyService>(ApiKeyProxyService);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('validateApiKey', () => {
        const apiKey = 'testAttr';
        const mockedAttribute = { apiKeyName: 'value' } as unknown as ApiKeyValueModel;

        it('should call apiKeyQuery.handleAsync with correct parameters', async () => {
            apiKeyQuery.handleAsync.mockResolvedValue(mockedAttribute);

            await service.validateApiKey(apiKey);

            expect(apiKeyQuery.handleAsync).toHaveBeenCalledWith({ value: apiKey });
        });

        it('should return the apiKeyName from the query result', async () => {
            apiKeyQuery.handleAsync.mockResolvedValue(mockedAttribute);

            const value = await service.validateApiKey(apiKey);

            expect(value).toBe(mockedAttribute.apiKeyName);
        });
    });
});