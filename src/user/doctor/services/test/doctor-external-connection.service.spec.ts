import { DoctorRepository } from '../../repositories/doctor.repository';
import { TestBed } from '@automock/jest';
import { DoctorExternalConnectionService } from '../doctor-external-connection.service';
import { DoctorFlatService } from '../doctor-flat.service';
import { PostDoctorRequestDto } from '../../dtos/request/post.doctor.dto';
import { mockDoctor } from './stub/doctor.stub';
import { DoctorResponseDto } from '../../dtos/response/base.doctor.response.dto';
import { DoctorManagementService } from '../doctor-management.service';
import { NotFoundException } from '@nestjs/common';
import { PatchDoctorRequestDto } from '../../dtos/request/patch.doctor.request.dto';

describe('DoctorExternalConnectionService', () => {
  let service: DoctorExternalConnectionService;
  let managementService: jest.Mocked<DoctorManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorExternalConnectionService).compile();

    service = unit;
    managementService = unitRef.get(DoctorManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedDto: PostDoctorRequestDto = {
      name: 'Name',
      lastname: 'Lastname',
      email: 'test@email.com',
      dni: '1234567890'
    };
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    }
    const expectResult = mockedDoctorFlat;

    it('should create a new doctor', async () => {
      // Arrange
      managementService.create.mockResolvedValue(mockedDoctorFlat);

      // Act
      const result = await service.create(mockedDto);

      // Assert
      expect(managementService.create).toHaveBeenCalledWith(mockedDto);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOne', () => {
    const mockedDni = '1234567890';
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    }
    const expectResult = mockedDoctorFlat;

    it('should find one doctor by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValue(mockedDoctorFlat);

      // Act
      const result = await service.findOne(mockedDni);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockedDni);
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneOrCreate', () => {
    const mockedDto: PostDoctorRequestDto = {
      name: 'Name',
      lastname: 'Lastname',
      email: 'test@email.com',
      dni: '1234567890'
    };
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    }
    const expectResult = mockedDoctorFlat;

    it('should find an existing doctor by dni', async () => {
      // Arrange
      managementService.findOneByDni.mockResolvedValue(mockedDoctorFlat);

      // Act
      const result = await service.findOneOrCreate(mockedDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockedDto.dni);
      expect(managementService.create).not.toHaveBeenCalled();
      expect(result).toEqual(expectResult);
    });

    it('should create a new doctor if not found', async () => {
      // Arrange
      managementService.findOneByDni.mockRejectedValue(new NotFoundException());
      managementService.create.mockResolvedValue(mockedDoctorFlat);

      // Act
      const result = await service.findOneOrCreate(mockedDto);

      // Assert
      expect(managementService.findOneByDni).toHaveBeenCalledWith(mockedDto.dni);
      expect(managementService.create).toHaveBeenCalledWith(mockedDto);
      expect(result).toEqual(expectResult);
    });

  });

  describe('findOneAndUpdate', () => {
    const mockedDni = '1234567890';
    const mockedDto: PatchDoctorRequestDto = {
      lastname: 'New Lastname',
      name: 'New Name'
    };
    const mockedDoctor = mockDoctor();
    const mockedDoctorFlat: DoctorResponseDto = {
      ...mockedDoctor.user,
      ...mockedDoctor,
      user: mockedDoctor.user.id
    }
    const expectResult = mockedDoctorFlat;

    it('should update a doctor by dni', async () => {
      // Arrange
      managementService.updateOneByDni.mockResolvedValue(mockedDoctorFlat);

      // Act
      const result = await service.findOneAndUpdate(mockedDni, mockedDto);

      // Assert
      expect(managementService.updateOneByDni).toHaveBeenCalledWith(mockedDni, mockedDto);
      expect(result).toEqual(expectResult);
    });
  });

});
