import { Inject, Injectable } from '@nestjs/common';
import { PostJobPositionWithKeyRequestDto } from '@/location/job-position/dtos/request/post.job-position-with-key.request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobPositionEvent, JobPositionExternalCreateEvent } from '@/shared/events/job-position.event';
import { PatientEvent, PatientExternalCreateEvent } from '@/shared/events/patient.event';
import { PostPatientRequestDto } from '@/user/patient/dtos/request/post.patient.request.dto';

@Injectable()
export class MedicalClientEventService {

  constructor(
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  emitExternalCreateEvent(
    source: string,
    patient: PostPatientRequestDto,
    jobPosition: PostJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
    this.emitJobPositionExternalCreateEvent(source, jobPosition);
  }

  emitJobPositionExternalCreateEvent(
    source: string,
    { key, ...jobPosition }: PostJobPositionWithKeyRequestDto,
  ): void {
    this.eventEmitter.emit(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, key, jobPosition));
  }
}
