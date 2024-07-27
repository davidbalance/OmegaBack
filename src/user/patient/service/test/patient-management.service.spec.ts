import { TestBed } from '@automock/jest';
import { PatientManagementService } from '../patient-management.service';
import { PatientRepository } from '../../patient.repository';
import { mockPatient, mockPatients } from './stub/patient.stub';
import { PatientResponseDto } from '../../dtos/response/base.patient.response.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { Patient } from '../../entities/patient.entity';
import { INJECT_PATIENT_FLAT_SERVICE } from '../patient-flat.service';
import { mockFlatPatient } from './stub/patient-flat.stub';

describe('PatientManagementService', () => {
  let service: PatientManagementService;
  let repository: jest.Mocked<PatientRepository>;
  let flatService: jest.Mocked<FlatService<Patient, PatientResponseDto>>;

  const mockedFlatPatient = mockFlatPatient();

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientManagementService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    flatService = unitRef.get(INJECT_PATIENT_FLAT_SERVICE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedPatients = mockPatients()

    it('should return an array of patients', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatient);
      repository.find.mockResolvedValueOnce(mockedPatients);

      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatient);

      const result = await service.find();

      expect(result).toEqual(mockedFlatResult);
    });

  });

  describe('findByExtraAttribute', () => {
    const mockedPatients = mockPatients();

    const attributeName: string = 'my-attribute-key';
    const attributeValue: string = 'my-attribute-value';

    it('should return an array of patients by a given attribute', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatient);
      repository.find.mockResolvedValueOnce(mockedPatients);

      const mockedFlatResult = mockedPatients.map(() => mockedFlatPatient);

      const result = await service.findByExtraAttribute(attributeName, attributeValue);

      expect(result).toEqual(mockedFlatResult);
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
        }
      });
    });
  });

  describe('findOneByDni', () => {
    const mockedPatient = mockPatient();

    const dni: string = '1234567890';

    it('should return a patient by a given dni', async () => {
      flatService.flat.mockReturnValue(mockedFlatPatient);
      repository.findOne.mockResolvedValueOnce(mockedPatient);

      const result = await service.findOneByDni(dni);

      expect(result).toEqual(mockedFlatPatient);
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
