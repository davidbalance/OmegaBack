import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobPositionEvent, JobPositionExternalCreateEvent } from '@/shared/events/job-position.event';
import { PatientEvent, PatientExternalCreateEvent } from '@/shared/events/patient.event';
import { ExternalJobPositionWithKeyRequestDto } from '@/location/job-position/dtos/request/external-job-position-with-key.base.dto';
import { ExternalPatientRequestDto } from '@/user/patient/dtos/request/external-patient.base.dto';
import { PatientRequestDto } from '@/user/patient/dtos/request/patient.base.dto';

@Injectable()
export class MedicalClientEventService {

  constructor(
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  emitExternalCreateEvent(
    source: string,
    patient: PatientRequestDto,
    jobPosition: ExternalJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
    this.emitJobPositionExternalCreateEvent(source, jobPosition);
  }

  emitJobPositionExternalCreateEvent(
    source: string,
    { key, ...jobPosition }: ExternalJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, key, jobPosition));
  }
}
