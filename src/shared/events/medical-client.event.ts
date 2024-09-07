import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";
import { MedicalClientRequestDto } from "@/medical/medical-client/dtos/request/medical-client.base.dto";

export const MedicalClientEvent = {
    EXTERNAL_CREATE: 'medical-client.external.create'
}

export class MedicalClientExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly data: MedicalClientRequestDto,
        public readonly jobPosition: ExternalJobPositionWithKeyRequestDto
    ) { }
}