/* eslint-disable @typescript-eslint/unbound-method */
import { ApiKeyRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { ApiKeyFindManyQuery, ApiKeyFindManyQueryPayload } from "../api-key-find-many.query";
import { ApiKeyModel } from "@omega/auth/core/model/auth/api_key.model";

describe("ApiKeyFindManyQuery", () => {
    let jwt: jest.Mocked<JwtProvider>;
    let repository: jest.Mocked<ApiKeyRepository>;
    let query: ApiKeyFindManyQuery;

    beforeEach(() => {
        jwt = { validateJwt: jest.fn() } as unknown as jest.Mocked<JwtProvider>;
        repository = { findManyAsync: jest.fn() } as unknown as jest.Mocked<ApiKeyRepository>;

        query = new ApiKeyFindManyQuery(jwt, repository);
    });

    it("should return api keys when the JWT is valid", async () => {
        const payload: ApiKeyFindManyQueryPayload = { jwt: "valid-jwt" };
        const decodedData = { sub: "auth-id" };
        const apiKeys = [
            { id: 1, apiKeyValue: "api-key-1" },
            { id: 2, apiKeyValue: "api-key-2" }
        ] as unknown as ApiKeyModel[];

        jwt.validateJwt.mockReturnValue(decodedData);

        repository.findManyAsync.mockResolvedValue(apiKeys);

        const result = await query.handleAsync(payload);

        expect(jwt.validateJwt).toHaveBeenCalledWith(payload.jwt);
        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [{ field: 'authId', operator: 'eq', value: decodedData.sub }] });
        expect(result).toEqual(apiKeys);
    });
});
