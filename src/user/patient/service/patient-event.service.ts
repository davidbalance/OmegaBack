import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalClientEvent, MedicalClientExternalCreateEvent } from "@/shared/events/medical-client.event";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";
import { MedicalClientRequestDto } from "@/medical/medical-client/dtos/request/medical-client.base.dto";

@Injectable()
export class PatientEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalClientExternalCreateEvent(
        source: string,
        medicalClient: MedicalClientRequestDto,
        jobPosition: ExternalJobPositionWithKeyRequestDto,
    ) {
        this.eventEmitter.emit(MedicalClientEvent.EXTERNAL_CREATE, new MedicalClientExternalCreateEvent(source, medicalClient, jobPosition));
    }
}