import { TestBed } from '@automock/jest';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { mockUser } from '@/user/user/services/test/stub/user-management.stub';
import { NotFoundException } from '@nestjs/common'
import { PatientExternalConnectionService } from '../patient-external-connection.service';
import { PatientRepository } from '../../repositories/patient.repository';
import { mockPatient } from './stub/patient.stub';
import { PatientGenderEnum } from '../../enums/patient.enum';
import { PostPatientRequestDto } from '../../dtos/request/post.patient.request.dto';
import { PatchPatientRequestDto } from '../../dtos/request/patch.patient.request.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { PatientResponseDto } from '../../dtos/response/base.patient.response.dto';
import { Patient } from '../../entities/patient.entity';
import { INJECT_PATIENT_FLAT_SERVICE } from '../patient-flat.service';
import { mockFlatPatient } from './stub/patient-flat.stub';

describe('PatientExternalConnectionService', () => {
  let service: PatientExternalConnectionService;
  let repository: jest.Mocked<PatientRepository>;
  let userService: jest.Mocked<UserManagementService>;
  let flatService: jest.Mocked<FlatService<Patient, PatientResponseDto>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientExternalConnectionService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    userService = unitRef.get(UserManagementService);
    flatService = unitRef.get(INJECT_PATIENT_FLAT_SERVICE);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should throw an error when findOne is called', async () => {
      // Arrange
      const key = {}; // You can adjust this to be any value since it's not used in this case

      // Act & Assert
      await expect(service.findOne(key)).rejects.toThrow('Method not implemented.');
    });
  })

  describe('create', () => {

    const mockedUser = mockUser();
    const mockedPatient = mockPatient();
    const mockedFlatPatient = mockFlatPatient();

    const mockDto: PostPatientRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should create a patient with existing user', async () => {

      userService.findOneByDni.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedPatient);
      flatService.flat.mockReturnValueOnce(mockedFlatPatient);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedFlatPatient);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ birthday: mockDto.birthday, gender: mockDto.gender, user: mockedUser });
    });

    it('should create a patient with new user', async () => {
      userService.findOneByDni.mockRejectedValueOnce(new NotFoundException());
      userService.create.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedPatient);
      flatService.flat.mockReturnValueOnce(mockedFlatPatient);

      const result = await service.create(mockDto);
      const { birthday, gender, ...user } = mockDto;

      expect(result).toEqual(mockedFlatPatient);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith({ ...user, email: null });
      expect(repository.create).toHaveBeenCalledWith({ birthday: mockDto.birthday, gender: mockDto.gender, user: mockedUser });
    });
  });

  describe('findOneOrCreate', () => {

    const mockedUser = mockUser();
    const mockedPatient = mockPatient();
    const mockedFlatPatient = mockFlatPatient();

    const mockDto: PostPatientRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should return an existing patient', async () => {
      flatService.flat.mockReturnValueOnce(mockedFlatPatient);
      repository.findOne.mockResolvedValueOnce(mockedPatient);

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedFlatPatient);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: mockDto.dni }
        },
        relations: { user: true }
      })
    });

    it('should not find a patient so creates it', async () => {
      repository.findOne.mockRejectedValueOnce(new NotFoundException());
      userService.findOneByDni.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedPatient);
      flatService.flat.mockReturnValueOnce(mockedFlatPatient);

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedFlatPatient);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: mockDto.dni }
        },
        relations: { user: true }
      });
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ birthday: mockDto.birthday, gender: mockDto.gender, user: mockedUser });
    });

  });

  describe('findOneAndUpdate', () => {

    const mockedUser = mockUser();
    const mockedPatient = mockPatient();
    const mockedFlatPatient = mockFlatPatient();

    const dni: string = '1234567890';
    const mockDto: PatchPatientRequestDto = {
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should update existing patient', async () => {
      repository.findOne.mockResolvedValueOnce(mockedPatient);
      userService.updateOne.mockResolvedValueOnce(mockedUser);
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedPatient);
      flatService.flat.mockReturnValueOnce(mockedFlatPatient);

      const result = await service.findOneAndUpdate(dni, mockDto);

      const { birthday, gender, ...user } = mockDto;

      expect(result).toEqual(mockedFlatPatient);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { user: { dni: dni } },
        select: { user: { id: true } }
      });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedUser.id, { ...user, email: null });
    });
  });

});
