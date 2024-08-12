import { TestBed } from "@automock/jest";
import { WebClientRepository } from "../repositories/web-client.repository";
import { CredentialWebClientListener } from "./credential-web-client.listener";

describe('CredentialWebClientListener', () => {
    let listener: CredentialWebClientListener;
    let repository: jest.Mocked<WebClientRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CredentialWebClientListener).compile();

        listener = unit;
        repository = unitRef.get(WebClientRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onCreate', () => {
        const mockedId = 1;

        it('should create a new web client when a credential is created', async () => {
            // Arrange
            repository.create.mockResolvedValue(undefined);

            // Act
            await listener.onCreate({ id: mockedId });

            // Assert
            expect(repository.create).toHaveBeenCalledWith({ user: mockedId });
        });
    });
});