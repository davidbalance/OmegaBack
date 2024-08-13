import { ApiKeyValidatorService } from "@/authentication/api-key/services/api-key-validator.service";
import { ApiKeyAuthStrategy } from "./api-key-auth.strategy";
import { TestBed } from "@automock/jest";
import { UnauthorizedException } from "@nestjs/common";

describe('AreaManagementService', () => {
    let strategy: ApiKeyAuthStrategy;
    let validatorService: jest.Mocked<ApiKeyValidatorService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ApiKeyAuthStrategy).compile();

        strategy = unit;
        validatorService = unitRef.get(ApiKeyValidatorService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validate', () => {
        const mockedUser: number = 1;

        it('should validate API key and return user data', async () => {
            // Arrange
            const apiKey = 'valid-api-key';
            validatorService.validate.mockResolvedValue(mockedUser);
            const done = jest.fn();

            // Act
            await strategy.validate(apiKey, done);

            // Assert
            expect(validatorService.validate).toHaveBeenCalledWith(apiKey);
            expect(done).toHaveBeenCalledWith(null, mockedUser);
        });

        it('should throw UnauthorizedException if validation fails', async () => {
            // Arrange
            const apiKey = 'invalid-api-key';
            validatorService.validate.mockRejectedValue(new Error());
            const done = jest.fn();

            // Act
            await strategy.validate(apiKey, done);

            // Assert
            expect(validatorService.validate).toHaveBeenCalledWith(apiKey);
            expect(done).toHaveBeenCalledWith(expect.any(UnauthorizedException), null);
        });
    });
});