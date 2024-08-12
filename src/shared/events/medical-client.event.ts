import { PostJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/post.job-position-with-key.request.dto";
import { PostMedicalClientRequestDto } from "@/medical/medical-client/dtos/request/post.medical-client.request.dto";

export const MedicalClientEvent = {
    EXTERNAL_CREATE: 'medical-client.external.create'
}

export class MedicalClientExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly data: PostMedicalClientRequestDto,
        public readonly jobPosition: PostJobPositionWithKeyRequestDto
    ) { }
}