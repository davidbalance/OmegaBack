import { TestBed } from "@automock/jest";
import { ApiKeyRepository } from "../../repositories/api-key.repository";
import { ApiKeyManagementService } from "../api-key-management.service";
import { UserCredentialService } from "@/authentication/user-credential/services/user-credential.service";
import { ConfigService } from "@nestjs/config";
import { mockApiKey, mockApiKeys } from "./stub/api-key.stub";
import { PatchApiKeyRequestDto } from "../../dtos/request/patch.api-key.request.dto";
import { mockCredential } from "@/authentication/user-credential/services/tests/stub/credential.stub";
import { PostApiKeyRequestDto } from "../../dtos/request/post.api-key.request.dto";

describe('ApiKeyManagementService', () => {
    let service: ApiKeyManagementService;
    let repository: jest.Mocked<ApiKeyRepository>;
    let credentialService: jest.Mocked<UserCredentialService>;
    let configService: jest.Mocked<ConfigService>

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ApiKeyManagementService).compile();

        service = unit;
        repository = unitRef.get(ApiKeyRepository);
        credentialService = unitRef.get(UserCredentialService);
        configService = unitRef.get(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('create', () => {
        const user = 1;
        const apiKey = 'new-api-key';
        const mockedCredential = mockCredential();
        const mockedApiKey = mockApiKey();
        const mockDto: PostApiKeyRequestDto = {
            name: "my-api-key"
        }
        const expiresIn = 3600;

        it('should create and return a new API key', async () => {
            // Arrange
            credentialService.findOneByUser.mockResolvedValue(mockedCredential);
            configService.get.mockReturnValue(expiresIn);
            repository.create.mockResolvedValue(mockedApiKey);

            // Act
            const result = await service.create(user, mockDto);

            // Assert
            expect(result).toEqual(mockedApiKey);
            expect(credentialService.findOneByUser).toHaveBeenCalledWith(user);
            expect(configService.get).toHaveBeenCalledWith('APIKEY_EXPIRES_IN');
            expect(repository.create).toHaveBeenCalledWith({
                name: mockDto.name,
                value: expect.any(String),
                credential: mockedCredential,
                expiresAt: expect.any(Date)
            });
        });
    });

    describe('findAll', () => {
        const mockedApikeys = mockApiKeys();
        const user: number = 1;

        it('should return all active API keys for a user', async () => {
            // Arrange
            repository.find.mockResolvedValue(mockedApikeys);

            // Act
            const result = await service.findAll(user);

            // Assert
            expect(result).toEqual(mockedApikeys);
            expect(repository.find).toHaveBeenCalledWith({
                where: { status: true, credential: { user } },
                relations: { credential: true },
                select: { id: true, name: true },
            });
        });
    });

    describe('updateOne', () => {
        const id = 1;
        const mockedApiKey = mockApiKey();
        const mockDto: PatchApiKeyRequestDto = {
            name: 'mocked-name'
        }

        it('should update and return an API key', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedApiKey);

            // Act
            const result = await service.updateOne(id, mockDto);

            // Assert
            expect(result).toEqual(mockedApiKey);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
        });
    });

    describe('deleteOne', () => {
        const id = 1;
        it('should delete an API key by ID', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.deleteOne(id);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
        });
    });
});