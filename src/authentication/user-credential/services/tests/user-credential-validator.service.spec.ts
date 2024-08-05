import { TestBed } from "@automock/jest";
import { UserCredentialRepository } from "../../repositories/user-credential.repository";
import { UserCredentialValidatorService } from "../user-credential-validator.service";
import { mockCredential } from "./stub/credential.stub";
import bcrypt from 'bcrypt';
import { ForbiddenException } from "@nestjs/common";

describe('UserCredentialValidatorService', () => {
    let service: UserCredentialValidatorService;
    let repository: jest.Mocked<UserCredentialRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserCredentialValidatorService).compile();

        service = unit;
        repository = unitRef.get(UserCredentialRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validate', () => {
        const username = 'test@example.com';
        const password = 'test-password';
        const userId = 1;
        const mockedCredential = mockCredential();

        it('should return the user ID if the credentials are valid', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCredential);
            jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

            // Act
            const result = await service.validate(username, password);

            // Assert
            expect(result).toBe(userId);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { email: username, status: true },
                select: { user: true, password: true },
            });
            expect(bcrypt.compareSync).toHaveBeenCalledWith(password, mockedCredential.password);
        });

        it('should throw a ForbiddenException if the password is incorrect', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCredential);
            jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(false);

            // Act & Assert
            await expect(service.validate(username, password))
                .rejects
                .toThrowError(ForbiddenException);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { email: username, status: true },
                select: { user: true, password: true },
            });
            expect(bcrypt.compareSync).toHaveBeenCalledWith(password, mockedCredential.password);
        });
    });
});