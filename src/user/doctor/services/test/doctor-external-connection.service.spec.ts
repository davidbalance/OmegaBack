import { DoctorRepository } from '../../doctor.repository';
import { TestBed } from '@automock/jest';
import { mockDoctor } from './stub/doctor.stub';
import { DoctorExternalConnectionService } from '../doctor-external-connection.service';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { mockUser } from '@/user/user/services/test/stub/user-management.stub';
import { NotFoundException } from '@nestjs/common';
import { PATCHDoctorRequestDto } from '../../dtos/patch.doctor-management.dto';
import { POSTDoctorRequestDto } from '../../dtos/post.doctor-management.dto';

describe('DoctorExternalConnectionService', () => {
  let service: DoctorExternalConnectionService;
  let repository: jest.Mocked<DoctorRepository>;
  let userService: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorExternalConnectionService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
    userService = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {

    const mockedUser = mockUser();
    const mockedDoctor = mockDoctor();

    const mockDto: POSTDoctorRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      email: 'my-mocked@email.com'
    }

    it('should create a doctor with existing user', async () => {

      userService.findOneByDni.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedDoctor);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedDoctor);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser });
    });

    it('should create a doctor with new user', async () => {
      userService.findOneByDni.mockRejectedValueOnce(new NotFoundException());
      userService.create.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedDoctor);

      const result = await service.create(mockDto);

      expect(result).toEqual(mockedDoctor);
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith(mockDto);
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser });
    });
  });

  describe('findOneOrCreate', () => {
    
    const mockedUser = mockUser();
    const mockedDoctor = mockDoctor();

    const mockDto: POSTDoctorRequestDto = {
      dni: '1234567890',
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      email: 'my-mocked@email.com'
    }

    it('should return an existing doctor', async () => {
      repository.findOne.mockResolvedValueOnce(mockedDoctor);

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedDoctor);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: mockDto.dni }
        },
        relations: { user: true }
      })
    });

    it('should not find a doctor so creates it', async () => {
      repository.findOne.mockRejectedValueOnce(new NotFoundException());
      userService.findOneByDni.mockResolvedValueOnce(mockedUser);
      repository.create.mockResolvedValueOnce(mockedDoctor);

      const result = await service.findOneOrCreate(mockDto);

      expect(result).toEqual(mockedDoctor);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: mockDto.dni }
        },
        relations: { user: true }
      });
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ user: mockedUser });
    });

  });

  describe('findOneAndUpdate', () => {
    
    const mockedUser = mockUser();
    const mockedDoctor = mockDoctor();

    const dni: string = '1234567890';
    const mockDto: PATCHDoctorRequestDto = {
      name: 'Mocked Name',
      lastname: 'Mocked Lastname',
      email: 'my-mocked@email.com'
    }

    it('should update existing doctor', async () => {
      repository.findOne.mockResolvedValueOnce(mockedDoctor);
      userService.updateOne.mockResolvedValueOnce(mockedUser);

      const result = await service.findOneAndUpdate(dni, mockDto);

      expect(result).toEqual({ ...mockedDoctor, user: mockedUser });
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni }
        },
        select: {
          user: { id: true }
        }
      });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedUser.id, mockDto);

    });
  });

});
