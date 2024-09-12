import { PostBranchExternalRequestDto } from "@/location/branch/dtos/request/external-branch.post.dto";

export const BranchEvent = {
    EXTERNAL_CREATE: 'branch.external.create',
}

export class BranchExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly key: string,
        public readonly data: PostBranchExternalRequestDto
    ) { }
}