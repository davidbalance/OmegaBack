import { DoctorManagementService } from '../doctor-management.service';
import { TestBed } from '@automock/jest';
import { mockDoctor, mockDoctorArray } from './stub/doctor.stub';
import { DoctorRepository } from '../../repositories/doctor.repository';
import { DoctorFlatService } from '../doctor-flat.service';

describe('DoctorManagementService', () => {
  let service: DoctorManagementService;
  let repository: jest.Mocked<DoctorRepository>;
  let flatService: jest.Mocked<DoctorFlatService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorManagementService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
    flatService = unitRef.get(DoctorFlatService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('find', () => {

    const mockedDoctors = mockDoctorArray();
    const mockedFlat = mockedDoctors.map(e => ({ ...e.user, ...e, user: e.user.id }))

    it('should return an array of doctors', async () => {
      repository.find.mockResolvedValueOnce(mockedDoctors);
      mockedFlat.forEach(flatService.flat.mockReturnValueOnce);

      const doctors = await service.find();

      expect(doctors).toEqual(mockedFlat);
      expect(flatService.flat).toHaveBeenCalledTimes(mockedDoctors.length);
    });

  });

  describe('findOne', () => {

    const mockedDoctor = mockDoctor();
    const mockedFlat = { ...mockedDoctor.user, ...mockedDoctor, user: mockedDoctor.user.id }

    const id: number = 1;

    it('should return a doctor by id', async () => {
      repository.findOne.mockResolvedValueOnce(mockedDoctor);
      flatService.flat.mockReturnValueOnce(mockedFlat);

      const doctor = await service.findOne(id);

      expect(doctor).toEqual(mockedFlat);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: id },
        select: {
          id: true,
          hasFile: true,
          user: { id: true, dni: true, email: true, name: true, lastname: true }
        }
      });
      expect(flatService.flat).toHaveBeenCalledWith(mockedDoctor);
    });
  });

  describe('findOneByDni', () => {

    const mockedDoctor = mockDoctor();
    const mockedFlat = { ...mockedDoctor.user, ...mockedDoctor, user: mockedDoctor.user.id }

    const dni: string = '1234567890';

    it('should return a doctor by dni', async () => {
      repository.findOne.mockResolvedValueOnce(mockedDoctor);
      flatService.flat.mockReturnValueOnce(mockedFlat);

      const doctor = await service.findOneByDni(dni);

      expect(doctor).toEqual(mockedFlat);
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
    });
  });
});
