import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { DoctorEvent, DoctorExternalCreateEvent } from "@/shared/events/doctor.event";

@Injectable()
export class DoctorExternalListener {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly service: DoctorExternalConnectionService
    ) { }

    @OnEvent(DoctorEvent.EXTERNAL_CREATE)
    async findOrCreate({ data }: DoctorExternalCreateEvent): Promise<void> {
        await this.service.findOneOrCreate(data);
    }
}