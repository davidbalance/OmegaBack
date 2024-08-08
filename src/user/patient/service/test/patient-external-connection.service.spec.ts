import { TestBed } from '@automock/jest';
import { PatientExternalConnectionService } from '../patient-external-connection.service';
import { PatientEventService } from '../patient-event.service';
import { PatientManagementService } from '../patient-management.service';

describe('PatientExternalConnectionService', () => {
  let service: PatientExternalConnectionService;
  let managementService: jest.Mocked<PatientManagementService>;
  let eventService: jest.Mocked<PatientEventService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientExternalConnectionService).compile();

    service = unit;
    managementService = unitRef.get(PatientManagementService);
    eventService = unitRef.get(PatientEventService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
});
