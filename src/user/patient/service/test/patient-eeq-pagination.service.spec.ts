import { TestBed } from '@automock/jest';
import { PatientRepository } from '../../patient.repository';
import { PatientEeqPaginationService } from '../patient-eeq-pagination.service';
import { mockPatients } from './stub/patient.stub';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { PatientEeqResponseDto } from '../../dtos/response/base.patient-eeq.response.dto';
import { Patient } from '../../entities/patient.entity';
import { INJECT_PATIENT_EEQ_FLAT_SERVICE } from '../patient-eeq-flat.service';
import { mockFlatPatientEeq } from './stub/patient-eeq-flat.stub';

describe('PatientEeqPaginationService', () => {
  let service: PatientEeqPaginationService;
  let repository: jest.Mocked<PatientRepository>;
  let flatService: jest.Mocked<FlatService<Patient, PatientEeqResponseDto | null>>;

  const mockedPatients = mockPatients();
  const mockedFlatPatientEeq = mockFlatPatientEeq();
  const mockedCount: number = 5;

  const queryValue: any = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(mockedPatients),
    getCount: jest.fn().mockResolvedValue(mockedCount)
  }

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientEeqPaginationService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    flatService = unitRef.get(INJECT_PATIENT_EEQ_FLAT_SERVICE);

    repository.query.mockReturnValue(queryValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findPaginatedByFilter', () => {

    it('should return an array of patients', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatientEeq);
      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatientEeq);

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

  describe('findPaginatedDataAndPageCount', () => {
    const limit = 5;
    it('should return an array with the data and number of pages available', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatientEeq);
      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatientEeq);

      const [pages, data] = await service.findPaginatedDataAndPageCount(1, limit);

      expect(pages).toEqual(1);
      expect(data).toEqual(mockedFlatResult);
      expect(repository.query).toHaveBeenCalledWith('patient');
      expect(repository.query).toHaveBeenCalledTimes(2);
    });
  });
});
