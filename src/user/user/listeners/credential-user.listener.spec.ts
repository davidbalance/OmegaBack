import { TestBed } from "@automock/jest";
import { UserManagementService } from "../services/user-management.service";
import { CredentialUserListener } from "./credential-user.listener";

describe('CredentialUserListener', () => {
    let listener: CredentialUserListener;
    let service: jest.Mocked<UserManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CredentialUserListener).compile();

        listener = unit;
        service = unitRef.get(UserManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onCreate', () => {
        const mockedId = 1;

        it('should update the user with hasCredential to true when a credential is created', async () => {
            // Arrange
            service.updateOne.mockResolvedValue(undefined);

            // Act
            await listener.onCreate({ id: mockedId });

            // Assert
            expect(service.updateOne).toHaveBeenCalledWith(mockedId, { hasCredential: true });
        });
    });

    describe('removeCredential', () => {
        const mockedId = 1;

        it('should update the user with hasCredential to false when a credential is removed', async () => {
            // Arrange
            service.updateOne.mockResolvedValue(undefined);

            // Act
            await listener.removeCredential({ id: mockedId });

            // Assert
            expect(service.updateOne).toHaveBeenCalledWith(mockedId, { hasCredential: false });
        });
    });

});