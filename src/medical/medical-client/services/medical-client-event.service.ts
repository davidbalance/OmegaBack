import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobPositionEvent, JobPositionExternalCreateEvent, JobPositionLocalCreateEvent } from '@/shared/events/job-position.event';
import { PatientEvent, PatientExternalCreateEvent, PatientLocalCreateEvent } from '@/shared/events/patient.event';
import { ExternalJobPositionWithKeyRequestDto } from '@/location/job-position/dtos/request/external-job-position-with-key.base.dto';
import { PatientRequestDto } from '@/user/patient/dtos/request/patient.base.dto';
import { JobPositionRequestDto } from '@/location/job-position/dtos/request/job-position.base.dto';

@Injectable()
export class MedicalClientEventService {

  constructor(
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  emitLocalCreateEvent(
    patient: PatientRequestDto,
    jobPosition?: JobPositionRequestDto,
  ): void {
    this.eventEmitter.emit(PatientEvent.LOCAL_CREATE, new PatientLocalCreateEvent(patient));
    if (jobPosition) {
      this.emitJobPositionLocalCreateEvent(jobPosition);
    }
  }

  emitExternalCreateEvent(
    source: string,
    patient: PatientRequestDto,
    jobPosition?: ExternalJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
    if (jobPosition) {
      this.emitJobPositionExternalCreateEvent(source, jobPosition);
    }
  }

  emitJobPositionExternalCreateEvent(
    source: string,
    { key, ...jobPosition }: ExternalJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, key, jobPosition));
  }

  emitJobPositionLocalCreateEvent(
    data: JobPositionRequestDto,
  ): void {
    this.eventEmitter.emit(JobPositionEvent.LOCAL_CREATE, new JobPositionLocalCreateEvent(data));
  }
}
