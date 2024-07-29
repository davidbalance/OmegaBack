import { TestBed } from '@automock/jest';
import { PatientRepository } from '../../repositories/patient.repository';
import { mockPatients } from './stub/patient.stub';
import { PatientPaginationService } from '../patient-pagination.service';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { PatientResponseDto } from '../../dtos/response/base.patient.response.dto';
import { Patient } from '../../entities/patient.entity';
import { INJECT_PATIENT_FLAT_SERVICE } from '../patient-flat.service';
import { mockFlatPatient } from './stub/patient-flat.stub';

describe('PatientPaginationService', () => {
  let service: PatientPaginationService;
  let repository: jest.Mocked<PatientRepository>;
  let flatService: jest.Mocked<FlatService<Patient, PatientResponseDto>>;

  const mockedPatients = mockPatients();
  const mockedFlatPatient = mockFlatPatient();
  const mockedCount: number = 5;

  const queryValue: any = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(mockedPatients),
    getCount: jest.fn().mockResolvedValue(mockedCount)
  }

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientPaginationService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    flatService = unitRef.get(INJECT_PATIENT_FLAT_SERVICE);

    repository.query.mockReturnValue(queryValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findPaginatedDataAndPageCount', () => {
    const limit = 5;
    it('should return an array with the data and number of pages available', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatient);
      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatient);

      const [pages, data] = await service.findPaginatedDataAndPageCount(1, limit);

      expect(pages).toEqual(1);
      expect(data).toEqual(mockedFlatResult);
      expect(repository.query).toHaveBeenCalledWith('patient');
      expect(repository.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('findPaginatedByFilter', () => {

    it('should return an array of patients', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatient);
      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatient);

      const result = await service.findPaginatedByFilter();

      expect(result).toEqual(mockedFlatResult);
      expect(repository.query).toHaveBeenCalledWith('patient');
    });
  });

  describe('findPageCount', () => {
    const limit = 5;

    it('should return the number of pages available', async () => {

      const result = await service.findPageCount(limit);
      expect(result).toEqual(1);
      expect(repository.query).toHaveBeenCalledWith('patient');
    });
  });
});
