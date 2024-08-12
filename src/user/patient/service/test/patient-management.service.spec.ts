import { TestBed } from '@automock/jest';
import { PatientManagementService } from '../patient-management.service';
import { PatientRepository } from '../../repositories/patient.repository';
import { mockPatient, mockPatients } from './stub/patient.stub';
import { PatientResponseDto } from '../../dtos/response/base.patient.response.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { Patient } from '../../entities/patient.entity';
import { INJECT_PATIENT_FLAT_SERVICE } from '../patient-flat.service';
import { mockFlatPatient } from './stub/patient-flat.stub';
import { PostPatientRequestDto } from '../../dtos/request/post.patient.request.dto';
import { PatientGenderEnum } from '../../enums/patient.enum';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { mockUser } from '@/user/user/services/test/stub/user-management.stub';
import { PatchPatientRequestDto } from '../../dtos/request/patch.patient.request.dto';

describe('PatientManagementService', () => {
  let service: PatientManagementService;
  let repository: jest.Mocked<PatientRepository>;
  let userService: jest.Mocked<UserManagementService>;
  let flatService: jest.Mocked<FlatService<Patient, PatientResponseDto>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientManagementService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    userService = unitRef.get(UserManagementService);
    flatService = unitRef.get(INJECT_PATIENT_FLAT_SERVICE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PostPatientRequestDto = {
      gender: PatientGenderEnum.MALE,
      birthday: new Date('2000-01-01'),
      dni: '1234567890',
      name: 'Name',
      lastname: 'Lastname'
    };
    const mockedUser = mockUser();
    const mockedPatient = mockPatient();
    const mockedFlatPatient = mockFlatPatient();
    const expectResult = mockedFlatPatient;

    it('should create a new patient with an existing user', async () => {
      // Arrange
      userService.findOneByDni.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedPatient);
      flatService.flat.mockReturnValue(mockedFlatPatient);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).not.toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser, birthday: mockDto.birthday, gender: mockDto.gender });
      expect(flatService.flat).toHaveBeenCalledWith(mockedPatient);
      expect(result).toEqual(expectResult);
    });

    it('should create a new patient with a new user', async () => {
      // Arrange
      userService.findOneByDni.mockRejectedValue(new Error('User not found'));
      userService.create.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedPatient);
      flatService.flat.mockReturnValue(mockedFlatPatient);
      const { birthday, gender, ...user } = mockDto;

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith({ ...user, email: null });
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser, birthday: mockDto.birthday, gender: mockDto.gender });
      expect(flatService.flat).toHaveBeenCalledWith(mockedPatient);
      expect(result).toEqual(expectResult);
    });
  });

  describe('find', () => {
    const mockedPatients = mockPatients();
    const mockedFlatPatient = mockFlatPatient();
    const expectResult = mockedPatients.map(() => mockedFlatPatient);

    it('should find all patients', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedPatients);
      flatService.flat.mockReturnValue(mockedFlatPatient);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          user: { status: true }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        },
        cache: 1000 * 900
      });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findByExtraAttribute', () => {
    const name: string = 'employee_of';
    const value: string = '1234567890';
    const mockedPatients = mockPatients();
    const mockedFlatPatient = mockFlatPatient();
    const expectResult = mockedPatients.map(() => mockedFlatPatient);

    it('should find patients by extra attribute', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedPatients);
      flatService.flat.mockReturnValue(mockedFlatPatient);

      // Act
      const result = await service.findByExtraAttribute(name, value);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          user: {
            extraAttributes: { name: name, value: value },
            status: true,
          }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        },
      });
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneByDni', () => {
    const dni: string = '1234567890';
    const mockedPatient = mockPatient();
    const mockedFlatPatient = mockFlatPatient();
    const expectResult = mockedFlatPatient;

    it('should find one patient by dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedPatient);
      flatService.flat.mockReturnValue(mockedFlatPatient);

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        },
        cache: 1000 * 900
      });
      expect(flatService.flat).toHaveBeenCalledWith(mockedPatient);
      expect(result).toEqual(expectResult);
    });
  });

  describe('updateOne', () => {
    const dni: string = '1234567890';
    const mockDto: PatchPatientRequestDto = {
      birthday: new Date('2000-01-01'),
      gender: PatientGenderEnum.MALE,
      lastname: 'Lastname',
      name: 'Name'
    };
    const mockedPatient = mockPatient();
    const mockedUser = mockUser();
    const mockedFlatPatient = mockFlatPatient();
    const expectResult = mockedFlatPatient;

    it('should update a patient by dni', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedPatient);
      userService.updateOne.mockResolvedValue(mockedUser);
      repository.findOneAndUpdate.mockResolvedValue(mockedPatient);
      flatService.flat.mockReturnValue(mockedFlatPatient);
      const { birthday, gender, ...data } = mockDto;

      // Act
      const result = await service.updateOne(dni, mockDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { user: { dni: dni } }, relations: { user: true } });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedPatient.user.id, { ...mockedPatient.user, email: null });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ user: { dni: dni } }, { birthday, gender });
      expect(flatService.flat).toHaveBeenCalledWith(mockedPatient);
      expect(result).toEqual(expectResult);
    });
  });

});
