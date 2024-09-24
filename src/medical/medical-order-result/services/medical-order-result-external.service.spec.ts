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
import { PostExternalMedicalOrderResultBase64RequestDto } from '../dtos/request/external-medical-result-order-upload-base64.post.dto';
import { mockMedicalResult } from '@/medical/medical-result/stub/medical-result.stub';
import { MedicalResultManagementService } from '@/medical/medical-result/services/medical-result-management.service';
import { MedicalResultFileManagementService } from '@/medical/medical-result/services/medical-result-file-management.service';

describe('MedicalOrderResultExternalService', () => {
  let service: MedicalOrderResultExternalService;
  let orderService: jest.Mocked<IExternalConnectionService<ExternalMedicalOrderRequestDto, ExternalMedicalOrder>>;
  let resultService: jest.Mocked<IExternalConnectionService<ExternalMedicalResultRequestDto, ExternalMedicalResult>>;
  let resultManagementService: jest.Mocked<MedicalResultManagementService>;
  let resultFileService: jest.Mocked<MedicalResultFileManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderResultExternalService).compile();

    service = unit;
    orderService = unitRef.get(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION);
    resultService = unitRef.get(INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION);
    resultManagementService = unitRef.get(MedicalResultManagementService);
    resultFileService = unitRef.get(MedicalResultFileManagementService);
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

  describe('uploadBase64LaboratorioClinico', () => {
    const source: string = 'test-source'
    const key = 'test-key';
    const keyParam: ExternalKeyParam = { source, key };
    const data: PostExternalMedicalOrderResultBase64RequestDto = {
      doctor: { dni: '1234567890', name: 'Test doctor', lastname: 'Test lastname', email: 'test@email.com' },
      base64: 'SampleBase64File',
      mimetype: 'application/json'
    }
    const mockedBaseOrder = mockExternalMedicalOrder();

    const mockedOrder = { ...mockedBaseOrder, results: [{ examName: 'LABORATORIO CLINICO', id: 1 } as any] };
    const expectedValue = mockedOrder;

    it('should find an existing result and upload a file', async () => {
      // Arrange
      orderService.findOne.mockResolvedValue(mockedOrder);
      resultFileService.uploadFromBase64.mockResolvedValue(undefined);
      // Act
      const result = await service.uploadBase64LaboratorioClinico(keyParam, data);
      // Assert
      expect(orderService.findOne).toHaveBeenCalledWith(keyParam);
      expect(resultManagementService.create).not.toHaveBeenCalled();
      expect(resultFileService.uploadFromBase64).toHaveBeenCalledWith(1, data.mimetype, data.base64);
      expect(result).toEqual(expectedValue);
    });

    it('should not find an existing result so create one and upload a file', async () => {
      // Arrange
      const mockedResult = mockMedicalResult();
      orderService.findOne.mockResolvedValueOnce({ ...mockedOrder, results: [] });
      orderService.findOne.mockResolvedValueOnce(mockedOrder);
      resultManagementService.create.mockResolvedValue(mockedResult);
      resultFileService.uploadFromBase64.mockResolvedValue(undefined);
      // Act
      const result = await service.uploadBase64LaboratorioClinico(keyParam, data);
      // Assert
      expect(orderService.findOne).toHaveBeenCalledWith(keyParam);
      expect(resultManagementService.create).toHaveBeenCalledWith({
        order: mockedOrder.id,
        doctorDni: data.doctor.dni,
        doctorFullname: `${data.doctor.name} ${data.doctor.lastname}`,
        examName: 'LABORATORIO CLINICO',
        examSubtype: 'LABORATORIO CLINICO',
        examType: 'LABORATORIO CLINICO',
      });
      expect(resultFileService.uploadFromBase64).toHaveBeenCalledWith(1, data.mimetype, data.base64);
      expect(result).toEqual(expectedValue);
    });
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
