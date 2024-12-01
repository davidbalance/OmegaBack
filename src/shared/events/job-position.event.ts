import { JobPositionRequestDto } from "@/location/job-position/dtos/request/job-position.base.dto";

export const JobPositionEvent = {
    LOCAL_CREATE: 'job.local.create',
    EXTERNAL_CREATE: 'job.external.create'
}

export class JobPositionExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly key: string,
        public readonly data: JobPositionRequestDto
    ) { }
}

export class JobPositionLocalCreateEvent {
    constructor(
        public readonly data: JobPositionRequestDto
    ) { }
}