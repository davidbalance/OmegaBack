/* eslint-disable @typescript-eslint/unbound-method */
import { ApiKeyValueRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { AuthValidateApiKeyCommand } from "../auth-validate-apikey.command";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api-key-value.model";
import { ApiKeyNotFoundError } from "@omega/auth/core/domain/auth/errors/api-key.errors";

describe("AuthValidateApiKeyCommand", () => {
    let repository: jest.Mocked<ApiKeyValueRepository>;
    let command: AuthValidateApiKeyCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ApiKeyValueRepository>;

        command = new AuthValidateApiKeyCommand(repository);
    });

    it("should validate the API key successfully when it exists", async () => {
        const apiKeyValue = "valid-apikey";
        const mockedApiKeyValue: ApiKeyValueModel = {
            apiKeyValue: apiKeyValue
        } as unknown as ApiKeyValueModel;

        repository.findOneAsync.mockResolvedValue(mockedApiKeyValue);

        await command.handleAsync({ apiKeyValue });

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "apiKeyValue", operator: "eq", value: apiKeyValue },
        ]);
    });

    it("should throw ApiKeyNotFoundError when API key does not exist", async () => {
        const apiKeyValue = "invalid-apikey";

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync({ apiKeyValue })).rejects.toThrow(ApiKeyNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "apiKeyValue", operator: "eq", value: apiKeyValue },
        ]);
    });
});
