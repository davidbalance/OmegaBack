import { Inject, Injectable } from '@nestjs/common';
import { PostJobPositionWithKeyRequestDto } from '@/location/job-position/dtos/request/post.job-position-with-key.request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JobPositionEvent, JobPositionExternalCreateEvent } from '@/shared/events/job-position.event';

@Injectable()
export class MedicalClientEventService {

  constructor(
    @Inject(EventEmitter2) private readonly emitter: EventEmitter2
  ) { }

  emitMedicalClientCreateEvent(
    source: string,
    { key, ...jobPosition }: PostJobPositionWithKeyRequestDto
  ): void {
    this.emitter.emit(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, key, jobPosition));
  }
}
