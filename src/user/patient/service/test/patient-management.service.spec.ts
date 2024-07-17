import { TestBed } from '@automock/jest';
import { PatientManagementService } from '../patient-management.service';
import { PatientRepository } from '../../patient.repository';
import { mockPatient, mockPatients } from './stub/patient.stub';

describe('PatientManagementService', () => {
  let service: PatientManagementService;
  let repository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientManagementService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);

    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedPatients = mockPatients()

    it('should return an array of patients', async () => {
      repository.find.mockResolvedValueOnce(mockedPatients);

      const result = await service.find();

      expect(result).toEqual(mockedPatients);
    });

  });

  describe('findByExtraAttribute', () => {
    const mockedPatients = mockPatients();

    const attributeName: string = 'my-attribute-key';
    const attributeValue: string = 'my-attribute-value';

    it('should return an array of patients by a given attribute', async () => {
      repository.find.mockResolvedValueOnce(mockedPatients);

      const result = await service.findByExtraAttribute(attributeName, attributeValue);

      expect(result).toEqual(mockedPatients);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          user: {
            extraAttributes: { name: attributeName, value: attributeValue },
            status: true,
          }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        },
        cache: 1000 * 900
      });
    });
  });

  describe('findOneByDni', () => {
    const mockedPatient = mockPatient();

    const dni: string = '1234567890';

    it('should return a patient by a given dni', async () => {
      repository.findOne.mockResolvedValueOnce(mockedPatient);

      const result = await service.findOneByDni(dni);

      expect(result).toEqual(mockedPatient);
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
    });
  });
});
