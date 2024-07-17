import { TestBed } from '@automock/jest';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { mockUser } from '@/user/user/services/test/stub/user-management.stub';
import { NotFoundException } from '@nestjs/common'
import { PatientExternalConnectionService } from '../patient-external-connection.service';
import { PatientRepository } from '../../patient.repository';
import { mockPatient } from './stub/patient.stub';
import { PATCHPatientRequestDto, POSTPatientRequestDto } from '../../dtos/patient.request.dto';
import { PatientGenderEnum } from '../../common/enums/patient.enum';

describe('PatientExternalConnectionService', () => {
  let service: PatientExternalConnectionService;
  let repository: jest.Mocked<PatientRepository>;
  let userService: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientExternalConnectionService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    userService = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {

    const mockedUser = mockUser();
    const mockedPatient = mockPatient();

    const mockDto: POSTPatientRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should create a patient with existing user', async () => {

      userService.findOneByDni.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedPatient);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedPatient);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ birthday: mockDto.birthday, gender: mockDto.gender, user: mockedUser });
    });

    it('should create a patient with new user', async () => {
      userService.findOneByDni.mockRejectedValueOnce(new NotFoundException());
      userService.create.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedPatient);

      const result = await service.create(mockDto);
      const { birthday, gender, ...user } = mockDto;

      expect(result).toEqual(mockedPatient);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith({ ...user, email: null });
      expect(repository.create).toHaveBeenCalledWith({ birthday: mockDto.birthday, gender: mockDto.gender, user: mockedUser });
    });
  });

  describe('findOneOrCreate', () => {

    const mockedUser = mockUser();
    const mockedPatient = mockPatient();

    const mockDto: POSTPatientRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should return an existing patient', async () => {
      repository.findOne.mockResolvedValueOnce(mockedPatient);

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedPatient);
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

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedPatient);
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

    const dni: string = '1234567890';
    const mockDto: PATCHPatientRequestDto = {
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      gender: PatientGenderEnum.MALE,
      birthday: new Date()
    }

    it('should update existing patient', async () => {
      repository.findOne.mockResolvedValueOnce(mockedPatient);
      userService.updateOne.mockResolvedValueOnce(mockedUser);
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedPatient);

      const result = await service.findOneAndUpdate(dni, mockDto);

      const { birthday, gender, ...user } = mockDto;

      expect(result).toEqual(mockedPatient);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { user: { dni: dni } },
        select: { user: { id: true } }
      });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedUser.id, { ...user, email: null });
    });
  });

});
