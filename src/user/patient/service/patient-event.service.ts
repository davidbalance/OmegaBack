import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalClientEvent, MedicalClientExternalCreateEvent } from "@/shared/events/medical-client.event";
import { PostJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/post.job-position-with-key.request.dto";
import { PostMedicalClientRequestDto } from "@/medical/medical-client/dtos/request/post.medical-client.request.dto";

@Injectable()
export class PatientEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalClientExternalCreateEvent(
        source: string,
        medicalClient: PostMedicalClientRequestDto,
        jobPosition: PostJobPositionWithKeyRequestDto,
    ) {
        this.eventEmitter.emit(MedicalClientEvent.EXTERNAL_CREATE, new MedicalClientExternalCreateEvent(source, medicalClient, jobPosition));
    }
}