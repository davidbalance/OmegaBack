import { TestBed } from "@automock/jest";
import { UserManagementService } from "../services/user-management.service";
import { UserManagementController } from "./user-management.controller";
import { mockUser, mockUserArray } from "../services/test/stub/user-management.stub";
import { GetUserArrayResponseDto } from "../dtos/response/get.user.response.dto";
import { PostUserRequestDto } from "../dtos/request/post.user.request.dto";
import { PatchUserRequestDto } from "../dtos/request/patch.user.dto";

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

  describe('find', () => {
    const user: number = 1;
    const mockedUsers = mockUserArray();
    const expectResult: GetUserArrayResponseDto = { data: mockedUsers };

    it('should find all users', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedUsers);

      // Act
      const result = await controller.find(user);

      // Assert
      expect(service.find).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectResult);
    });
  });

  describe('create', () => {
    const mockDto: PostUserRequestDto = {
      name: "Name",
      lastname: "Lastname",
      email: "test@email.com",
      dni: "1234567890"
    };
    const mockedUser = mockUser();
    const expectResult = mockedUser;

    it('should create a new user', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedUser);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockDto: PatchUserRequestDto = {
      lastname: 'Lastname',
      name: 'Name'
    };
    const mockedUser = mockUser();
    const expectResult = mockedUser;

    it('should update a user', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedUser);

      // Act
      const result = await controller.updateOne(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(expectResult);
    });
  });
});