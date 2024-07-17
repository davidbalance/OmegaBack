import { DoctorManagementService } from '../doctor-management.service';
import { DoctorRepository } from '../../doctor.repository';
import { TestBed } from '@automock/jest';
import { mockDoctor, mockDoctors } from './stub/doctor.stub';

describe('DoctorManagementService', () => {
  let service: DoctorManagementService;
  let repository: jest.Mocked<DoctorRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorManagementService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);

    jest.clearAllMocks();
  });

  describe('find', () => {

    it('should return an array of doctors', async () => {
      repository.find.mockResolvedValueOnce(mockDoctors);

      const doctors = await service.find();

      expect(doctors).toEqual(mockDoctors);
    });

  });

  describe('findOne', () => {
    const id: number = 1;

    it('should return a doctor by id', async () => {
      repository.findOne.mockResolvedValueOnce(mockDoctor);

      const doctor = await service.findOne(id);

      expect(doctor).toEqual(mockDoctor);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: id },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true }
        }
      })
    });
  });

  describe('findOneByDni', () => {
    const dni: string = '1234567890';

    it('should return a doctor by dni', async () => {
      repository.findOne.mockResolvedValueOnce(mockDoctor);

      const doctor = await service.findOneByDni(dni);

      expect(doctor).toEqual(mockDoctor);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni }
        },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true }
        }
      })
    });
  });
});
