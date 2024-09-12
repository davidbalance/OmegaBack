import { TestBed } from '@automock/jest';
import { MedicalOrderResultExternalService } from './medical-order-result-external.service';
import { ExternalMedicalOrderRequestDto } from '@/medical/medical-order/dtos/request/external-medical-order.base.dto';
import { PatientGenderEnum } from '@/user/patient/enums/patient.enum';
import { ExternalMedicalResultRequestDto } from '@/medical/medical-result/dtos/request/external-medical-result.base.dto';
import { ExternalMedicalResultOrderRequestDto } from '../dtos/request/external-medical-result-order.base.dto';
import { ExternalKeyParam, IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { mockExternalMedicalOrder } from '@/medical/medical-order/stubs/external-medical-order-entity.stub';
import { mockExternalMedicalResult } from '@/medical/medical-result/stub/external-medical-result.stub';
import { ExternalMedicalOrder } from '@/medical/medical-order/dtos/response/external-medical-order.base.dto';
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from '@/medical/medical-order/services/medical-order-external-connection.service';
import { ExternalMedicalResult } from '@/medical/medical-result/dtos/response/external-medical-result.base.dto';
import { INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION } from '@/medical/medical-result/services/medical-result-external-connection.service';

describe('MedicalOrderResultExternalService', () => {
  let service: MedicalOrderResultExternalService;
  let orderService: jest.Mocked<IExternalConnectionService<ExternalMedicalOrderRequestDto, ExternalMedicalOrder>>;
  let resultService: jest.Mocked<IExternalConnectionService<ExternalMedicalResultRequestDto, ExternalMedicalResult>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderResultExternalService).compile();

    service = unit;
    orderService = unitRef.get(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION);
    resultService = unitRef.get(INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne', async () => {
    expect(service.findOne).toBeDefined()
  });

  it('findOneOrCreate', async () => {
    expect(service.findOneOrCreate).toBeDefined()
  });

  it('findOneAndUpdate', async () => {
    expect(service.findOneAndUpdate).toBeDefined()
  });

  describe('create', () => {
    const source: string = 'test-source'
    const key = 'test-key';
    const keyParam: ExternalKeyParam = { source, key };
    const data: ExternalMedicalResultOrderRequestDto = {
      results: [
        {
          key: 'external-key-1',
          exam: {
            key: 'exam-key',
            type: {
              key: 'type-key',
              name: 'exam type'
            },
            name: 'exam-key'
          },
          doctor: {
            name: 'Test name',
            lastname: 'Test lastname',
            email: 'test@email.com',
            dni: '1234567890'
          },
        },
        {
          key: 'external-key-1',
          exam: {
            key: 'exam-key',
            type: {
              key: 'type-key',
              name: 'exam type'
            },
            name: 'exam-key'
          },
          doctor: {
            name: 'Test name',
            lastname: 'Test lastname',
            email: 'test@email.com',
            dni: '1234567890'
          },
        },
      ],
      branch: {
        key: 'test-key',
        company: {
          key: 'test-key',
          corporativeGroup: {
            key: 'test-key',
            name: 'Test group'
          },
          name: 'Test name',
          ruc: '1234567890001',
          address: 'Test address',
          phone: ''
        },
        name: 'Test branch',
        city: 'Quito'
      },
      patient: {
        email: 'test@email.com',
        gender: PatientGenderEnum.MALE,
        birthday: new Date(),
        name: 'Test patient',
        lastname: 'Test patient',
        dni: '1234567890'
      },
      process: 'test process'
    }
    const { results, ...mockedOrder } = mockExternalMedicalOrder();
    const { order, ...mockedResult } = mockExternalMedicalResult();
    const expectedValue = { ...mockedOrder, results: [mockedResult, mockedResult] };

    it('should create a medical order with results', async () => {
      // Arrange
      orderService.findOneOrCreate.mockResolvedValue({ ...mockedOrder, results: [] });
      resultService.create.mockResolvedValue(mockedResult);
      // Act
      const result = await service.create(keyParam, data);
      // Assert
      const { results, ...orderData } = data;
      expect(orderService.findOneOrCreate).toHaveBeenCalledWith(keyParam, orderData);
      const { key: firstKey, ...firstResult } = results[0];
      expect(resultService.create).toHaveBeenNthCalledWith(1, { ...keyParam, key: firstKey }, {
        ...firstResult,
        order: { ...orderData, key: keyParam.key }
      });
      const { key: secondKey, ...secondResult } = results[1];
      expect(resultService.create).toHaveBeenNthCalledWith(2, { ...keyParam, key: secondKey }, {
        ...secondResult,
        order: { ...orderData, key: keyParam.key }
      });
      expect(result).toEqual(expectedValue);
    });
  });
});
