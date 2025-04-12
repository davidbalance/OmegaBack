import { TestBed } from "@automock/jest";
import { ApiKeyValidatorService } from "../api-key-validator.service";
import { ApiKeyRepository } from "../../repositories/api-key.repository";
import { mockApiKey } from "./stub/api-key.stub";
import { NotFoundException } from "@nestjs/common";

describe('ApiKeyValidatorService', () => {
    let service: ApiKeyValidatorService;
    let repository: jest.Mocked<ApiKeyRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ApiKeyValidatorService).compile();

        service = unit;
        repository = unitRef.get(ApiKeyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validate', () => {
        const userId = 1;
        const mockedApiKey = mockApiKey();

        it('should return the user ID for a valid API key', async () => {
            // Arrange
            const apiKey = 'valid-api-key';
            repository.findOne.mockResolvedValue(mockedApiKey);

            // Act
            const result = await service.validate(apiKey);

            // Assert
            expect(result).toBe(userId);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { value: apiKey, status: true },
                relations: { credential: true },
            });
        });

        it('should throw an error if no API key is found', async () => {
            // Arrange
            const apiKey = 'invalid-api-key';
            repository.findOne.mockRejectedValueOnce(new NotFoundException());

            // Act & Assert
            await expect(service.validate(apiKey))
                .rejects
                .toThrowError(NotFoundException);
        });
    });
});