import { TestBed } from "@automock/jest";
import { UserCredentialService } from "../services/user-credential.service";
import { UserCredentialController } from "./user-credential.controller";
import { PostCredentialRequestDto } from "../dtos/request/post.user-credential.request.dto";
import { PatchChangePasswordRequestDto } from "../dtos/request/patch.user-credential.request.dto";

describe('UserCredentialController', () => {
  let controller: UserCredentialController;
  let service: jest.Mocked<UserCredentialService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserCredentialController).compile();

    controller = unit;
    service = unitRef.get(UserCredentialService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostCredentialRequestDto = {
      email: 'test@example.com',
      password: 'password123',
      user: 1
    };

    it('should call the service to create a new credential', async () => {
      // Arrange
      service.create.mockResolvedValue(undefined);

      // Act
      await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('findOneCredentialAndUpdatePassword', () => {
    const mockDto: PatchChangePasswordRequestDto = {
      email: 'test@example.com',
      password: 'newpassword123'
    };

    it('should call the service to update the password', async () => {
      // Arrange
      service.updatePassword.mockResolvedValue(undefined);

      // Act
      await controller.findOneCredentialAndUpdatePassword(mockDto);

      // Assert
      expect(service.updatePassword).toHaveBeenCalledWith(mockDto.email, mockDto.password);
    });
  });

});