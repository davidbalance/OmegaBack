import { TestBed } from "@automock/jest";
import { UserManagementService } from "../services/user-management.service";
import { UserManagementController } from "./user-management.controller";
import { mockUser } from "../stub/user.stub";
import { PostUserRequestDto } from "../dtos/request/user.post.dto";
import { PatchUserRequestDto } from "../dtos/request/user.patch.dto";

describe('UserManagementController', () => {
  let controller: UserManagementController;
  let service: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserManagementController).compile();

    controller = unit;
    service = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find user by token', async () => {
    // Arrange
    const userId = 1;
    const mockedUser = mockUser();
    service.findOne.mockResolvedValue(mockedUser);

    // Act
    const result = await controller.findOneByToken(userId);

    // Assert
    expect(service.findOne).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expect.objectContaining({
      ...mockedUser
    }));
  });

  it('should find user by id', async () => {
    // Arrange
    const userId = 1;
    const mockedUser = mockUser();
    service.findOne.mockResolvedValue(mockedUser);

    // Act
    const result = await controller.findOneById(userId);

    // Assert
    expect(service.findOne).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expect.objectContaining({
      ...mockedUser
    }));
  });

  it('should create a user', async () => {
    // Arrange
    const mockDto: PostUserRequestDto = {
      name: 'John',
      lastname: 'Doe',
      dni: '1234567890',
      email: 'test@example.com',
      role: 'admin'
    };
    const mockedUser = mockUser();
    service.create.mockResolvedValue(mockedUser);

    // Act
    const result = await controller.create(mockDto);

    // Assert
    expect(service.create).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(expect.objectContaining({
      ...mockedUser
    }));
  });

  it('should update a user', async () => {
    // Arrange
    const userId = 1;
    const mockDto: PatchUserRequestDto = { name: 'Updated Name' };
    service.updateOne.mockResolvedValue(undefined);

    // Act
    const result = await controller.updateOne(userId, mockDto);

    // Assert
    expect(service.updateOne).toHaveBeenCalledWith(userId, mockDto);
    expect(result).toEqual({});
  });

  it('should delete a user', async () => {
    // Arrange
    const userId = 1;
    service.deleteOne.mockResolvedValue(undefined);

    // Act
    const result = await controller.deleteOne(userId);

    // Assert
    expect(service.deleteOne).toHaveBeenCalledWith(userId);
    expect(result).toEqual({});
  });
});
