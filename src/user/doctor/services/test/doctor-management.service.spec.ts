import { DoctorManagementService } from '../doctor-management.service';
import { TestBed } from '@automock/jest';
import { mockDoctor, mockDoctorArray } from './stub/doctor.stub';
import { DoctorRepository } from '../../repositories/doctor.repository';
import { DoctorFlatService } from '../doctor-flat.service';
import { PostDoctorRequestDto } from '../../dtos/request/post.doctor.dto';
import { mockUser } from '@/user/user/services/test/stub/user-management.stub';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { DoctorResponseDto } from '../../dtos/response/base.doctor.response.dto';
import { PatchDoctorRequestDto } from '../../dtos/request/patch.doctor.request.dto';

describe('DoctorManagementService', () => {
  let service: DoctorManagementService;
  let repository: jest.Mocked<DoctorRepository>;
  let flatService: jest.Mocked<DoctorFlatService>;
  let userService: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorManagementService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
    flatService = unitRef.get(DoctorFlatService);
    userService = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostDoctorRequestDto = {
      name: 'Name',
      lastname: 'Lastname',
      email: 'test@email.com',
      dni: '1234567890'
    };
    const mockedUser = mockUser();
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    }
    const expectResult = mockedDoctorFlat;

    it('should create a new doctor with an existing user', async () => {
      // Arrange
      userService.findOneByDni.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedDoctor);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser });
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
      expect(result).toEqual(expectResult);
    });

    it('should create a new doctor with a new user', async () => {
      // Arrange
      userService.findOneByDni.mockRejectedValue(new Error('User not found'));
      userService.create.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedDoctor);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith(mockDto);
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser });
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
      expect(result).toEqual(expectResult);
    });
  });

  describe('find', () => {
    const mockedDoctors = mockDoctorArray();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctors[0].user,
      ...mockedDoctors[0],
      user: mockedDoctors[0].user.id
    };
    const expectResult = mockedDoctors.map(() => mockedDoctorFlat);

    it('should find all doctors', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedDoctors);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true, hasCredential: true }
        },
        cache: 1000 * 900
      });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    };
    const expectResult = mockedDoctorFlat;

    it('should find one doctor by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedDoctor);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: id },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true }
        }
      });
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneByDni', () => {
    const dni: string = '1234567890';
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    };
    const expectResult = mockedDoctorFlat;

    it('should find one doctor by dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedDoctor);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni }
        },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true }
        }
      });
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOneByDni', () => {
    const dni: string = '1234567890';
    const mockDto: PatchDoctorRequestDto = {
      lastname: 'Lastname',
      name: 'Name'
    };
    const mockedDoctor = mockDoctor();
    const mockedUser = mockUser();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    };
    const expectResult = mockedDoctorFlat;

    it('should update a doctor by dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedDoctor);
      userService.updateOne.mockResolvedValue(mockedUser);
      flatService.flat.mockReturnValue(mockedDoctorFlat);

      // Act
      const result = await service.updateOneByDni(dni, mockDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { user: { dni } } });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedDoctor.user.id, mockDto);
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
      expect(result).toEqual(expectResult);
    });
  });

});
