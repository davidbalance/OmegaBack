import { UserManagementService } from "@/user/user/services/user-management.service";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorManagementService } from "./doctor-management.service";
import { TestBed } from "@automock/jest";
import { DoctorRequestDto } from "../dtos/request/doctor.base.dto";
import { mockUser } from "@/user/user/stub/user.stub";
import { mockDoctorEntity } from "../stub/doctor-entity.stub";

describe('DoctorManagementService', () => {
  let service: DoctorManagementService;
  let repository: jest.Mocked<DoctorRepository>;
  let userService: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorManagementService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
    userService = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: DoctorRequestDto = {
      dni: '1234567890',
      name: 'Test User',
      lastname: 'Test Lastname',
      email: 'test@example.com',
    };
    const mockedUser = mockUser();
    const mockedDoctorEntity = mockDoctorEntity();
    const expectedData = { ...mockedDoctorEntity.user, ...mockedDoctorEntity, user: mockedDoctorEntity.user.id };

    it('should create a doctor with an existing user', async () => {
      // Arrange
      userService.findOneByDni.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedDoctorEntity);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ user: { id: mockedUser.id } });
      expect(result).toEqual(expectedData);
    });

    it('should create a doctor with a new user', async () => {
      // Arrange
      userService.findOneByDni.mockRejectedValue(new Error('User not found'));
      userService.create.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue({ user: mockedUser, ...mockedDoctorEntity });

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith(mockDto);
      expect(repository.create).toHaveBeenCalledWith({ user: { id: mockedUser.id } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedUser = mockUser();
    const mockedDoctorEntity = mockDoctorEntity();
    const expectedData = { ...mockedDoctorEntity.user, ...mockedDoctorEntity, user: mockedDoctorEntity.user.id };

    it('should find a doctor by ID', async () => {
      // Arrange
      repository.findOne.mockResolvedValue({ user: mockedUser, ...mockedDoctorEntity });

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: id },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true },
        },
      });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOneByDni', () => {
    const dni = '1234567890';
    const mockedUser = mockUser();
    const mockedDoctorEntity = mockDoctorEntity();
    const expectedData = { ...mockedDoctorEntity.user, ...mockedDoctorEntity, user: mockedDoctorEntity.user.id };

    it('should find a doctor by DNI', async () => {
      // Arrange
      repository.findOne.mockResolvedValue({ user: mockedUser, ...mockedDoctorEntity });

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni },
        },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true },
        },
      });
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOneByDni', () => {
    const dni = '1234567890';
    const mockDto: Partial<Omit<DoctorRequestDto, 'dni' | 'email'>> = {
      name: 'Updated User',
    };
    const mockedUser = mockUser();
    const mockedDoctorEntity = mockDoctorEntity();
    const expectedData = { ...mockedUser, ...mockedDoctorEntity, user: mockedUser.id };

    it('should update a doctor by DNI', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedDoctorEntity);
      userService.updateOne.mockResolvedValue(mockedUser);

      // Act
      const result = await service.updateOneByDni(dni, mockDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { user: { dni } } });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedUser.id, mockDto);
      expect(result).toEqual(expectedData);
    });
  });
});
