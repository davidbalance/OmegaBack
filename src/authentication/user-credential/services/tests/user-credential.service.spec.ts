import { TestBed } from "@automock/jest";
import { UserCredentialRepository } from "../../repositories/user-credential.repository";
import { UserCredentialEventService } from "../user-credential-event.service";
import { UserCredentialService } from "../user-credential.service";
import { PostCredentialRequestDto } from "../../dtos/request/post.user-credential.request.dto";
import { mockCredential } from "./stub/credential.stub";
import { ConflictException } from "@nestjs/common";
import { Not } from "typeorm";

describe('UserCredentialService', () => {
    let service: UserCredentialService;
    let repository: jest.Mocked<UserCredentialRepository>;
    let eventService: jest.Mocked<UserCredentialEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserCredentialService).compile();

        service = unit;
        repository = unitRef.get(UserCredentialRepository);
        eventService = unitRef.get(UserCredentialEventService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedCredential = mockCredential();
        const mockDto: PostCredentialRequestDto = {
            email: 'test@example.com',
            password: 'test-password',
            user: 1,
        };

        it('should create a new user credential', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(mockedCredential);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(result).toEqual(mockedCredential);
            expect(repository.create).toHaveBeenCalledWith({
                ...mockDto,
                password: expect.any(String),
            });
            expect(eventService.emitCredentialCreateEvent).toHaveBeenCalledWith(mockedCredential.user);
        });
    });

    describe('findOneByUser', () => {
        const user = 1;
        const mockedCredential = mockCredential();

        it('should find a user credential by user ID', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCredential);

            // Act
            const result = await service.findOneByUser(user);

            // Assert
            expect(result).toEqual(mockedCredential);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { user: user } });
        });
    });

    describe('updatePassword', () => {
        const username = 'test@example.com';
        const password = 'new-password';
        const mockedCredential = mockCredential();

        it('should update the password for a user credential', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedCredential);

            // Act
            const result = await service.updatePassword(username, password);

            // Assert
            expect(result).toEqual(mockedCredential);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ email: username }, { password: expect.any(String) });
        });
    });

    describe('updateEmailByUser', () => {
        const user = 1;
        const email = 'new-email@example.com';
        const mockedCredential = mockCredential();

        it('should update the email for a user credential', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(undefined);
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedCredential);

            // Act
            const result = await service.updateEmailByUser(user, email);

            // Assert
            expect(result).toEqual(mockedCredential);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { email: email, user: Not(user) } });
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ user }, { email: email });
        });

        it('should throw a ConflictException if the email already exists for another user', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCredential);

            // Act & Assert
            await expect(service.updateEmailByUser(user, email))
                .rejects
                .toThrowError(ConflictException);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { email: email, user: Not(user) } });
            expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
        });
    });

    describe('deleteOneByUser', () => {
        const user = 1;

        it('should delete a user credential by user ID', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValueOnce(undefined);

            // Act
            await service.deleteOneByUser(user);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ user: user });
        });
    });
});