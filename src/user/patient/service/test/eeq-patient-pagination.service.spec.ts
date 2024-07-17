import { TestBed } from '@automock/jest';
import { PatientRepository } from '../../patient.repository';
import { EeqPatientPaginationService } from '../eeq-patient-pagination.service';
import { flattenPatients, mockPatient, mockPatients } from './stub/patient.stub';

describe('EeqPatientPaginationService', () => {
  let service: EeqPatientPaginationService;
  let repository: jest.Mocked<PatientRepository>;

  const mockedPatients = mockPatients();
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
    const { unit, unitRef } = TestBed.create(EeqPatientPaginationService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    repository.query.mockReturnValue(queryValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findPaginatedByFilter', () => {

    it('should return an array of patients', async () => {

      const result = await service.findPaginatedByFilter();

      const expectedPatients = flattenPatients(mockedPatients);

      expect(result).toEqual(expectedPatients);
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

      const [pages, data] = await service.findPaginatedDataAndPageCount(1, limit);
      
      const expectedPatients = flattenPatients(mockedPatients);

      console.log(data, expectedPatients);

      expect(pages).toEqual(1);
      expect(data).toEqual(expectedPatients);
      expect(repository.query).toHaveBeenCalledWith('patient');
      expect(repository.query).toHaveBeenCalledTimes(2);
    });
  });
});
